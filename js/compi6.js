const box = document.getElementById("compi6_random");
const links = box.getElementsByTagName("a");
const boxPositionY = box.getBoundingClientRect().top;

for (let i = 0; i < links.length; i++) {
    // place link[i] in a random position inside box
    const x = Math.random() * box.clientWidth - links[i].clientWidth;
    const y = Math.random() * box.clientHeight;
    links[i].style.position = "absolute";
    links[i].style.left = `${x}px`;
    links[i].style.top = `${y + boxPositionY}px`;
}