export default (): void => {
  const image: Element = document.getElementsByClassName('img-scss__logo')[0]
  let rotate = 0
  let timerId: any = null

  const animation = (prev: any): number => {
    if (prev) {
      clearInterval(prev)
      timerId = null

      return timerId
    }

    timerId = setInterval((): void => {
      image.setAttribute('style', `transform: rotate(${(rotate += 1)}deg);`)
    }, 30)

    return timerId
  }

  animation(timerId)

  console.log(typeof timerId)

  image.addEventListener('click', () => animation(timerId))
}
