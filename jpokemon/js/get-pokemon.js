var url = 'https://pokeapi.co/api/v2/pokemon/?limit=6&offset=20'

var template1 = $('.template1')
  .detach()
  .removeClass('template1')

  var template2 = $('.template2')
    .detach()
    .removeClass('template2')

function loadPokemon(pokemon) {
  $.each(pokemon.results, function(i, pokemon) {
    addPokemon(pokemon);
  });
}

function addPokemon(pokemon) {
  var li = template1.clone();
  li.find('.pokemon-name a')
    .text(pokemon.name)
    .attr('href', pokemon.url)

  li.attr('data-id', pokemon.id);
  $('#pokemonList1').append(li);

  var li = template2.clone();
  li.find('.pokemon-name a')
    .text(pokemon.name)
    .attr('href', pokemon.url)

  li.attr('data-id', pokemon.id);
  $('#pokemonList2').append(li);
}

$.get({
  url: url,
  success: loadPokemon
});

$(document)
  .on('click', '.pokemon-name a', function(ev) {
    ev.preventDefault();
    var link = $(ev.currentTarget);
    var url = link.attr('href');
    $.get({
      url: url
    });
  });
