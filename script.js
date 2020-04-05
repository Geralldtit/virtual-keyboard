const keyboard = {
  elements: {
    main: null,
    keysWrapper: null,
    keys: []
  },

  eventHandlers: {
    oninput: null,
    onclose: null,
  },

  properties: {
    value: "",
    capsLock: false,
    shift: false
  },

  init() {
    this.elements.main = document.createElement('div');
    this.elements.keysWrapper = document.createElement('div');

    this.elements.main.classList.add('keyboard');
    this.elements.keysWrapper.classList.add('keys');
    this.elements.keysWrapper.appendChild(this._createKeys());

    this.elements.main.appendChild(this.elements.keysWrapper);
    document.body.appendChild(this.elements.main);

  },

  _createKeys() {
    const fragment = document.createDocumentFragment();
    const keyLayout = [
      "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",
      "tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "del",
      "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "enter",
      "lshift", "\\", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "↑", "rshift",
      "ctrl", "win", "alt", "space", "alt", "ctrl", "←", "↓", "→"
    ];

    keyLayout.forEach(key => {
      const keyElement = document.createElement('button');
      const insertLineBreak = ["backspace", "del", "enter", "rshift"].indexOf(key) !== -1;
      keyElement.setAttribute("type", "button");
      keyElement.classList.add("key");

      switch(key) {
        case "backspace":
          keyElement.classList.add("double-wide");
          keyElement.textContent = key.toLowerCase();

          keyElement.addEventListener('click', () => {
            this.properties.value =
              this.properties.value.substring(0, this.properties.value.length - 1);
              this._triggerEvent("oninput");
          });
          break;

        case "caps":
          keyElement.classList.add("double-wide", "switched-mode");
          keyElement.textContent = key.toLowerCase();

          keyElement.addEventListener('click', () => {
            this._toggleCapsLock();
            keyElement.classList.toggle('active', this.properties.capsLock);
          });
          break;

        case "enter":
          keyElement.classList.add("double-wide");
          keyElement.textContent = key.toLowerCase();
          keyElement.addEventListener('click', () => {
            this.properties.value += "\n";
            this._triggerEvent("oninput");
          });
          break;

        case "space":
          keyElement.classList.add("mega-wide");
          keyElement.addEventListener('click', () => {
            this.properties.value += " ";
            this._triggerEvent("oninput");
          });
          break;

        default:
          keyElement.textContent = key.toLowerCase();
          keyElement.addEventListener('click', () => {
            this.properties.value += this.properties.capsLock || this.properties.shift
                                      ? this.properties.value.toUpperCase()
                                      : this.properties.value.toLowerCase();
          this._triggerEvent("oninput");
          });
          break;
      };

      fragment.appendChild(keyElement);
      if(insertLineBreak) {
        fragment.appendChild(document.createElement("br"));
      }
    });

    return fragment;
  },

  _triggerEvent(handlerName) {
    console.log('Event triggered! Event name: ' + handlerName);
  },

  _toggleCapsLock() {
    console.log('Toggle CapsLock toggled');
  }

}

window.addEventListener('DOMContentLoaded', function(){
  keyboard.init();
});
