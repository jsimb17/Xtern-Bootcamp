$(document).foundation()

var megaRoster = {
  init: function(listSelector) {
    this.studentList = document.querySelector(listSelector);
    this.setupEventListeners();
    this.setupAjax();
    this.clearList();
    this.count = 0;
  },

  setupEventListeners: function() {
    document.querySelector('form#studentForm').onsubmit = this.addStudent.bind(this);
  },

  addStudent: function(ev) {
    ev.preventDefault();
    var f = ev.currentTarget;
    var studentName = f.studentName.value;
    var listItem = this.buildListItem(studentName);

    // studentList.appendChild(listItem);
    this.prependChild(this.studentList, listItem);

    f.reset();
    this.count += 1;

    f.studentName.focus();
  },

  prependChild: function(parent, child) {
    parent.insertBefore(child, parent.firstChild)
  },

  buildListItem: function(studentName) {
    var listItem = document.createElement('li');
    var span = document.createElement('span');
    span.innerText = studentName;
    span.className = 'studentName';
    listItem.appendChild(span);
    this.appendLinks(listItem);
    return listItem;
  },

  appendLinks: function(listItem) {
    var span = document.createElement('span');
    span.className += 'actions'
    var removeLink = this.buildLink({
      contents: '<i class="fa fa-times fa-2x"></i>',
      className: 'alert button',
      handler: function() {
        listItem.remove();
      }
    });
    var promoteLink = this.buildLink({
      contents: '<i class="fa fa-star fa-2x "></i>',
      handler: function() {
        this.promote(listItem);
      }.bind(this)
    });
    var moveUpLink = this.buildLink({
      contents: '<i class="fa fa-arrow-up fa-2x"></i>',
      className: 'moveUp',
      handler: function() {
        this.moveUp(listItem);
      }.bind(this)
    });
    var moveDownLink = this.buildLink({
      contents: '<i class="fa fa-arrow-down fa-2x"></i>',
      className: 'moveDown',
      handler: function() {
        this.moveDown(listItem);
      }.bind(this)
    });
    span.appendChild(this.buildLink({
      contents: '<i style="margin-left:1rem" class="fa fa-pencil fa-2x"></i>',
      className: 'edit',
      handler: function() {
        this.toggleEditable(listItem.querySelector('span.studentName'));
      }.bind(this)
    }));
    span.appendChild(removeLink);
    span.appendChild(promoteLink);
    span.appendChild(moveUpLink);
    span.appendChild(moveDownLink);
    listItem.appendChild(span);
  },

  buildLink: function(options) {
    var link = document.createElement('a');
    link.href = "#";
    link.innerHTML = options.contents;
    link.onclick = options.handler;
    link.className += (options.className || '');
    return link;
  },

  toggleEditable: function(el) {
    var toggleElement = el.parentElement.querySelector('a.edit');
    if (el.contentEditable === 'true') {
      el.contentEditable = 'false';
      toggleElement.innerHTML = '<i style="margin-left:1rem" class="fa fa-pencil fa-2x"></i>';
    }
    else {
      el.contentEditable = 'true';
      el.focus();
      toggleElement.innerHTML = '<i style="margin-left:1rem" class="fa fa-check fa-2x"></i>';
    }
  },

  promote: function(listItem) {
    this.prependChild(this.studentList, listItem);
    debugger;
  },

  moveUp: function(listItem) {
    if (listItem !== this.studentList.firstElementChild) {
      var previousItem = listItem.previousElementSibling;
      this.studentList.insertBefore(listItem, previousItem);
    }
  },

  moveDown: function(listItem) {
    if (listItem !== this.studentList.lastElementChild) {
      this.moveUp(listItem.nextElementSibling);
    }
  },

  clearList: function(ev) {
    $('#target').click( function(ev) {
      if(confirm("Do you want to clear?")){
        ev.preventDefault();
        $('#studentList').empty();
      }
    });
  },

  setupAjax: function(ev) {
    $('a[data-remote="true"]').on('click', function(ev) {
     ev.preventDefault();
        $.ajax({
          url: "https://mutant-school.herokuapp.com/api/v1/mutants",
          method: 'GET'
        }).done(function(data) {
          if(data) {
            for (ele of data){

              console.log(JSON.stringify(ele.real_name));
              var stud = megaRoster.buildListItem(JSON.stringify(ele.real_name));
              $('#studentList').append(stud);
            }
          }
        });
    })
  },
};
megaRoster.init('#studentList');
