export default class AnimationIntersection {
  constructor() { }
  oberseve = (array, finish) => {
    console.log('teste')
    try {
      const intersectionObserver = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting === true)) {
          entries.map((value, index) => {
            if (value.isIntersecting) {
              array.map((item) => {
                if (value.target.id === item.name) {

                  this.animation(item)

                }
              })

            }
          })
        }

      })
      if (finish) {
        intersectionObserver.disconnect();
      }
      else {
        array.map((value, index) => {
          if (value.array !== undefined) {
            value.array.map((item, index) => {
              intersectionObserver.observe(document.getElementById(`${value.name}_${index}`))
            })
          }
          else {
            intersectionObserver.observe(document.getElementById(value.name))
          }
        })
      }
    }
    catch (exception) {

      console.log(exception.message)

    }
  }
  animation = (item) => {
    console.log('teste2')
    const a = (properties) => {
      document.getElementById(item.name).style.animation = properties;
      const element = document.getElementById(item.name);
      const style = window.getComputedStyle(element);
      console.log(style);
    }
    if (item.animationPropertie === undefined) {
      a(`${item.animationName} 1s ease-in-out 0s 1 normal forwards`);
    }
    else {
      a(`${item.animationName} ${item.animationPropertie}`)
    }
  }
}