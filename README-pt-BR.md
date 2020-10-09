# Destaque

Destaque é um plugin de apresentação de slides simples com efeito de paralaxe integrado.

Consulte o [website jQuery Destaque](http://globocom.github.com/destaque/) para exemplos.

## Compatibilidade de Navegadores

* IE 7+
* Firefox 3.6+
* Chrome 4+
* Safari 5+
* Opera 10.10+

## Dependências

* [jQuery](http://jquery.com) 1.7.2
* [jQuery UI](http://jqueryui.com) 1.8.18
* [jQuery Mobile Events](https://github.com/jvduf/jquery-mobile-events)
  (suporte para gestos swipe. Opcional)
* [jQuery Transition](https://github.com/louisremi/jquery.transition.js)
  (para transições mais suaves usando CSS3. Opcional)

## Uso

````javascript

$("#slide-container").destaque({
  itemSelector: ".item",
  itemBackgroundSelector: ".background",
  itemForegroundElementSelector: ".foreground .element",
  controlsSelector: "#slide-pagination a"
});
````

Agora o HTML:

````html
<div id="slide-container">
  <div class="item">
    <div class="background">
      <img src="background-img.jpg"/>
    </div>

    <div class="foreground">
      <div class="element">Text 1</div>
      <div class="element">Text 2</div>
      <div class="element">Text 3</div>
    </div>
  </div>

  <div class="item">
    <div class="background">
      <img src="background-img.jpg"/>
    </div>

    <div class="foreground">
      <div class="element">Text 1</div>
      <div class="element">Text 2</div>
      <div class="element">Text 3</div>
    </div>
  </div>

  <div class="item">
    <!-- ... -->
  </div>
</div>

<p id="slide-pagination">
  <a href="#" rel="prev">Previous</a> - <a href="#" rel="next">Next</a>
</p>
````

### Inicialização do Plugin

#### Callbacks

* **onInit(instanceOfDestaque)**: Chamado logo após a inicialização do plugin.
* **onResize(instanceOfDestaque)**: Chamado quando a janela é redimensionada.
* **onPause(instanceOfDestaque)**: Chamado após a troca automática de slides ser pausada.
* **onResume(instanceOfDestaque)**: Chamado depois que a troca automática de slides for retomada.
* **onSlideLoad(instanceOfDestaque, item, index)**: Chamado depois que um slide é carregado.
* **beforePageUpdate(instanceOfDestaque, pageData)**: Chamado antes da paginação de slides. ex: pageData = {currentSlide: 0, totalSlides: 10}
* **onPageUpdate(instanceOfDestaque, pageData)**: Chamado após a paginação de slides.

#### Opções

* **currentSlide** (default: 0): Primeiro slide a ser ativado.
* **slideSpeed** (default: 1000): Velocidade de transição dos slides.
* **slideMovement** (default: 150): Quantidade de espaço que o slide atual muda, em pixels, ao alternar para o próximo slide.
* **slideDirection** (default: "toLeft"): Direção para qual os slides mudam.
* **elementSpeed** (default: 1000): Velocidade de transição dos elementos de primeiro plano.
* **autoSlideDelay** (default: 3000): Atraso de troca automática de slides.
* **resumeSlideDelay** (default: 250): Atraso mínimo antes que a troca automática de slides comece após ser pausada.
* **stopOnMouseOver** (default: true): Pausa a troca automática de slides quando o mouse está sobre o container.
* **easingType** (default: "easeInOutExpo"): Tipo de suavização usado em transições de elementos de primeiro plano e slide.
* **itemDefaultZIndex** (default: 10): Z-index atribuído a cada slide.
* **itemSelector** (default: "div.item"): Seletor CSS utilizado para encontrar cada slide.
* **itemLoadedClass** (default: "loaded"): Classe CSS adicionada logo após o slide ser carregado.
* **activeItemClass** (default: "active"): Classe CSS adicionada para o slide ativo.
* **itemBackgroundSelector** (default: ".background img"): Seletor CSS usado para encontrar o elemento de fundo de um slide.
* **itemForegroundElementSelector** (default: ".foreground img"): Seletor CSS usado para localizar cada elemento de primeiro plano em um slide.
* **controlsSelector** (default: undefined): Seletor CSS usado para encontrar os links de paginação.

#### Métodos

* **pause()**: Pausa a apresentação de slides até que um mouseover aconteça ou um resume seja chamado
* **resume()**: Retoma a apresentação de slides
* **restart()**: Envia a apresentação de slides para a primeira página
* **goTo(index)**: Envia a apresentação de slides para a página indicada, começa com 0.
* **refresh(paramsToOverride)**: Substitui alguns parâmetros e recalcula. Mantém a página atual. Usado para layouts adaptáveis.
* **slideSetAndMove(direction)**: Altera a direção do slide. Não funciona se o slide estiver em animação. Os valores possíveis são "toLeft" ou "toRight".

# Destaque Queue

Faz jquery.destaque funcionar aprimorado para mais de uma instância em uma página

Consulte o [website jQuery Destaque](http://globocom.github.com/destaque/) para exemplos.

## Uso

````javascript
$('.triple-slides').destaquesQueue({
  delay: 250,
  itemSelector: ".item-triple",
  itemBackgroundSelector: ".background-triple",
  itemForegroundElementSelector: ".foreground-triple .element",
  controlsSelector: "#slide-pagination a"
});
````

Agora o HTML:

````html
<div class="triple-slides">
  <div class="item-triple">
    <div class="background-triple"></div>

    <div class="foreground-triple">
      <div class="element">Text 1</div>
    </div>
  </div>
  <!-- the same markup for other itens -->
</div>

<div class="triple-slides">
  <div class="item-triple">
    <div class="background-triple"></div>
    <div class="foreground-triple">
      <div class="element">Text 2</div>
    </div>
  </div>
  <!-- the same markup for other itens -->
</div>

<div class="triple-slides">
  <div class="item-triple">
    <div class="background-triple"></div>
    <div class="foreground-triple">
      <div class="element">Text 3</div>
    </div>
  </div>
  <!-- the same markup for other itens -->
</div>

<p id="slide-pagination">
  <a href="#" rel="prev">Previous</a> - <a href="#" rel="next">Next</a>
</p>
````

### Inicialização do Plugin

#### Callbacks

Igual ao destaque

#### Options

Igual ao destaque, com:

* **delay** (default: 250): Atraso entre destaques.

#### Métodos

Igual ao destaque, com:

* **pauseFor(index)**
* **resumeFor(index)**
* **goToFor(index, slideNumber)**
* **refreshFor(index, paramsToOverride)**
* **slideSetAndMoveFor(index, direction)**

## Autores

* [Daniel Martins](https://github.com/danielfm)
* [Túlio Ornelas](https://github.com/tulios)
* [Emerson Macedo](https://github.com/emerleite)
* [Alexandre Magno](https://github.com/alexanmtz)

## Licença

Copyright (c) 2012 Globo.com - Webmedia. Veja [COPYING](https://github.com/globocom/destaque/blob/master/COPYING) para mais detalhes.

*Este artigo foi traduzido do [Inglês](README.md) para o [Português (Brasil)](README-pt-BR.md).*
