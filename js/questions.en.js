var questions = [
    [ new Questions("1.1 How many protons in the nucleus of this element?"),
        new Questions("1.2 How many electrons in the nucleus of this element?"),
        new Questions("1.3 What is the name of this element?")],

    [ new Questions("2.1 What is the atomic number of the element discovered in Dubna?"),
        new Questions("2.2 How many protons in the nucleus of the element discovered in Berkeley?"),
        new Questions("2.3 What name was approved by International Union of Pure and Applied Chemistry (IUPAC) for this item?")],
    [ new Questions("3.1 Which element is formed in this reaction?"),
        new Questions("3.2 What is the mass number of the obtained isotope?"),
        new Questions("3.3 The experiment showed that this isotope is radioactive and emits positrons. In the image you can see how many positrons registered by electroscope per second. Using the results of the experiment appreciate a half-life of this isotope in seconds.<br><img src='3dot3.jpg' width='250px'>")]
];


var answers = [
    [new Answers(["264", "104", "0"], "check"),
        new Answers(["264", "104", "0"], "check"),
        new Answers([""], "input")],
    [new Answers(["85", "105", "265"], "check"),
        new Answers(["91", "105", "265"], "check"),
        new Answers([""], "input")],
    [new Answers([""], "input"),
        new Answers(["29", "30", "31"], "check"),
        new Answers(["150", "400", "800"], "check")]
];


var correct = [
    ["104", "0", "rutherfordium"],
    ["105", "105", "dubnium"],
    ["phosphorus", "30", "150"]
];

var description = [
    ['The number of protons equal to the atomic number of the element', 'In the nucleus of an atom are protons and neutrons. Electrons orbit around the nucleus.', 'This element is called Rutherfordium. This name was approved by <a href="http://www.iupac.org/highlights/periodic-table-of-the-elements.html">IUPAC</a>'],
    [false, false, false],
    [false, false, false]
];

var isPhysics = [
    [1, 1, 0],
    [1, 1, 0],
    [1, 1, 1]
];

var test = [ new Test("img1.jpg", false),
    new Test(false, "In the labs of nuclear reactions of Nuclear Research Institute in Dubna in 1967-1970, Americium was irradiated by accelerated to an energy of 123 MeV neon ions.<br><br><img src='2i1.png'><img src='someneu.eng.png'><br><br> Russian physicists have proposed to call the new element nielsbohrium in honor of Niels Bohr. At the Lawrence Radiation Laboratory in Berkeley, atoms of californium are bombarded by nitrogen nuclei:<br><br> <img src='2i2.png'><img src='someneu.eng.png'><br><br>They proposed to call the new element Ghanium, in honor of Otto Ghan."),
    new Test(false, "This reaction was observed during irradiation of aluminum with alpha particles in a cyclotron in 1937:<br><br><img src='3i.png'>")
];

