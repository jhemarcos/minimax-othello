function Player(name, number, isIa) {
    this.name = name;
    this.number = number;
    this.isIa = isIa;
    this.color = number === 0 ? "black" : "white";
}