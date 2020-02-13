const createElement = (
  tag: string,
  className: string,
  id?: string,
  dataSet?: string,
): HTMLElement => {
  const name: HTMLElement = document.createElement(tag)
  name.classList.add(className)

  if (dataSet) {
    name.dataset.testid = dataSet
  }

  if (id) {
    name.id = id
  }

  return name
}

export const exampleDom = (): HTMLElement => {
  const main: HTMLElement | null = document.getElementsByTagName('main')[0]
  let clicked: HTMLElement | null = document.getElementById('clicked')
  let btnLess: HTMLElement | null = document.getElementById('btn-less')
  let btnTxt: Element = document.getElementsByClassName('btn-less__txt')[0]

  if (!btnLess) {
    btnLess = createElement('section', 'btn-less', 'btn-less')
  }

  if (!clicked) {
    clicked = createElement('div', 'btn-less__example', 'clicked', 'clicked-test')
  }
  if (!btnTxt) {
    btnTxt = createElement('h2', 'btn-less__txt')
    btnTxt.innerHTML = 'Click me'
  }

  btnLess.append(clicked)
  clicked.append(btnTxt)

  if (main) {
    main.append(btnLess)
  }

  function onBtnClick(): void {
    let elementCount: Element = document.getElementsByClassName('btn-less__count')[0]

    if (!elementCount) {
      elementCount = createElement('span', 'btn-less__count', 'btn-less__count', 'btn-less__count')
      if (btnLess) {
        btnLess.append(elementCount)
      }
    }

    if (clicked) {
      clicked.remove()
    }

    elementCount.innerHTML = 'To stop or start the animation click on it...'
  }

  if (clicked) {
    clicked.addEventListener('click', onBtnClick)
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return btnLess!
}
