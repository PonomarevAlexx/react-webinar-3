function* generator() {
    let ind = 8;
    while(true) {
        yield ind++;
    }
}

export default generator();