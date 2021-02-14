function lifesphereVisual() {
  let divPlayer = document.querySelector(`[data-hero="user"]`);

  let divLifesphere = document.createElement("div");
  divLifesphere.style.cssText = `
  background-image: url(./../../../public/gif/lifesphere.gif);
  position: absolute;
  width: 300px;
  height: 300px;
  `;

  document.body.append(divLifesphere);
}
