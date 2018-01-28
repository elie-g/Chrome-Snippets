console.clear();

Object.defineProperty(Array.prototype, 'flatMap', {
  value: function flatMap(callback) {
    if(typeof callback !== 'function')
      throw new TypeError('First argument of Array.prototype.flatMap must be a function');
    let temp = [];
    return this.map((...args) => {
      return callback(...args);
    }).reduce((x1, x2) => {
      if(typeof x1 !== 'object' || !Array.isArray(x1))
        x1 = [x1];
      if(typeof x2 !== 'object' || !Array.isArray(x2))
        x2 = [x2];
      return x1.concat(x2);
    });
  }
});

const memberSummaries = Array.from(document.querySelectorAll('.memberSummary'));


(() => {
  let container = document.createElement('div');
  container.className = 'fixed-members';
  let border = document.createElement('span');
  border.className = "m-resizer";
  let membersParent = document.createElement('div');
  memberSummaries.flatMap((sum, i) => {
      let span = document.createElement('span');
      span.className = "m-section";
      span.innerHTML = sum.previousElementSibling.previousElementSibling.getAttribute('name').split('.')[0];
      let members = Array.from(sum.querySelectorAll('.colLast > code'));
      return members.length > 0 ? [document.createElement('hr'), span].concat(members) : [];
    })
    .map(m => m.cloneNode(true))
    .map(m => {
      let wrapper = document.createElement('div');
      wrapper.appendChild(m);
      return wrapper;
    }).forEach(m => membersParent.appendChild(m));
  container.appendChild(border);
  container.appendChild(membersParent);
  document.body.appendChild(container);
  let style = document.createElement('style');
  style.innerHTML = `
.fixed-members {
  position: fixed;
  display: block;
  background-color: rgba(0,0,0,0.7);
  color: #EEE;
  min-height: 100vh;
  max-height: 100vh;
  width: auto;
  right: 0;
  top:0;
  margin: auto;
  will-change: width;
  caret-color: #0AF;
  max-width: 30vw;
  width: 30vw;
}
.fixed-members > div {
  max-height: 100vh;
  min-height: 100vh;
  overflow: auto;
  word-break: keep-all;
  overflow-wrap: keep-all;
  white-space: nowrap;
}
.fixed-members > div span {
  margin-left: .5em;
}
.fixed-members code:hover {
  font-size: 1.1em;
  font-style: italic;
}
.fixed-members code > span:first-child > a {
  color: #FFB000;
  line-height: 1.2;
}
.m-section {
  display: block;
  text-transform: capitalize;
  font-weight: bold;
  text-align: center;
}
.fixed-members a {
  color: #0FA;
}
.m-resizer {
  position: absolute;
  left: -2px;
  top: 0;
  bottom: 0;
  display: block;
  min-height: 100%;
  min-width: 3px;
  background-color: #222;
  cursor: w-resize;
}
.m-resizer:hover {
  min-width: 7px;
}

/* width */
::-webkit-scrollbar {
    width: 10px;
    height: 10px;
}

/* Track */
::-webkit-scrollbar-track {
    background: #f1f1f1; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
    background: #888; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #555; 
}
  `;
  document.body.insertBefore(style, container);
  border.addEventListener('mousedown', event => {
    window.initialData = {
      target: event.target.parentElement,
      x: event.x,
      y: event.y,
      w: event.target.parentElement.offsetWidth,
      h: event.target.parentElement.offsetHeight
    };
    event.preventDefault();
  });
  document.body.addEventListener('mousemove', event => {
    if(window.initialData) {
      window.initialData.target.style.maxWidth = window.initialData.target.style.width = (window.initialData.w + (window.initialData.x - event.x)) + 'px';
    }
  });
  document.body.addEventListener('mouseup', event => {
    if(window.initialData)
      delete window.initialData;
  });

///////////////////////////////// Back To Top Button /////////////////////////////////
  let btp = document.createElement('span');
  btp.innerHTML = `
<svg class="svg-inline--fa fa-arrow-alt-circle-up fa-w-16" aria-hidden="true" data-fa-processed="" data-prefix="fas" data-icon="arrow-alt-circle-up" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <path fill="currentColor" d="M256 504c137 0 248-111 248-248S393 8 256 8 8 119 8 256s111 248 248 248zm0-448c110.5 0 200 89.5 200 200s-89.5 200-200 200S56 366.5 56 256 145.5 56 256 56zm20 328h-40c-6.6 0-12-5.4-12-12V256h-67c-10.7 0-16-12.9-8.5-20.5l99-99c4.7-4.7 12.3-4.7 17 0l99 99c7.6 7.6 2.2 20.5-8.5 20.5h-67v116c0 6.6-5.4 12-12 12z"></path>
</svg>`;
  btp.className = 'btp-button';
  let styleBtp = document.createElement('style');
  styleBtp.innerHTML = `
.btp-button {
  width: 20px;
  height: 20px;
  margin: auto;
  border-radius: 50%;
  display: block;
  position: fixed;
  top: 20px;
  right: 25px;
  z-index: 200;
  color: #FFF !important;
  cursor: pointer;
}
.btp-button:hover {
  color: #FA0 !important;
}
  `;
  btp.addEventListener('click', event => {
    window.scrollTo(window.scrollX, 0);
  });
  document.body.appendChild(styleBtp);
  document.body.appendChild(btp);
})();