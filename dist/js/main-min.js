var pizzaMeats="Pepperoni;Sausage;Fennel Sausage;Spicy Sausage;Chicken;BBQ Chicken;Chorizo;Chicken Andouille;Salami;Tofu;Bacon;Canadian Bacon;Proscuitto;Italian Sausage;Ground Beef;Anchovies;Turkey;Ham;Venison;Lamb;Duck;Soylent Green;Carne Asada;Soppressata Picante;Coppa;Pancetta;Bresola;Lox;Guanciale;Chili;Beef Jerky;Pastrami;Kielbasa;Scallops;Filet Mignon".split(";"),pizzaMeatsLength=pizzaMeats.length,pizzaNonmeats="White Onions;Red Onions;Sauteed Onions;Green Peppers;Red Peppers;Banana Peppers;Ghost Peppers;Habanero Peppers;Jalapeno Peppers;Stuffed Peppers;Spinach;Tomatoes;Pineapple;Pear Slices;Apple Slices;Mushrooms;Arugula;Basil;Fennel;Rosemary;Cilantro;Avocado;Guacamole;Salsa;Swiss Chard;Kale;Sun Dried Tomatoes;Walnuts;Artichoke;Asparagus;Caramelized Onions;Mango;Garlic;Olives;Cauliflower;Polenta;Fried Egg;Zucchini;Hummus".split(";"),
pizzaNonmeatsLength=pizzaNonmeats.length;pizzaCheeses="American Cheese;Swiss Cheese;Goat Cheese;Mozzarella Cheese;Parmesean Cheese;Velveeta Cheese;Gouda Cheese;Muenster Cheese;Applewood Cheese;Asiago Cheese;Bleu Cheese;Boursin Cheese;Brie Cheese;Cheddar Cheese;Chevre Cheese;Havarti Cheese;Jack Cheese;Pepper Jack Cheese;Gruyere Cheese;Limberger Cheese;Manchego Cheese;Marscapone Cheese;Pecorino Cheese;Provolone Cheese;Queso Cheese;Roquefort Cheese;Romano Cheese;Ricotta Cheese;Smoked Gouda".split(";");
var pizzaCheesesLength=pizzaCheeses.length;pizzaSauces=["Red Sauce","Marinara","BBQ Sauce","No Sauce","Hot Sauce"];var pizzaSaucesLength=pizzaSauces.length;pizzaCrusts=["White Crust","Whole Wheat Crust","Flatbread Crust","Stuffed Crust"];var pizzaCrustsLength=pizzaCrusts.length;String.prototype.capitalize=function(){return this.charAt(0).toUpperCase()+this.slice(1)};
var globalAdjectiveList=["dark morbid scary spooky gothic deviant creepy sadistic black dangerous dejected haunted morose tragic shattered broken sad melancholy somber dark gloomy homicidal murderous shady misty dusky ghostly shadowy demented cursed insane possessed grotesque obsessed".split(" "),"blue green purple grey scarlet NeonGreen NeonBlue NeonPink HotPink pink black red maroon silver golden yellow orange mustard plum violet cerulean brown lavender violet magenta chestnut rosy copper crimson teal indigo navy azure periwinkle brassy verdigris veridian tan raspberry beige sandy ElectricBlue white champagne coral cyan".split(" "),
"whimsical silly drunken goofy funny weird strange odd playful clever boastful breakdancing hilarious conceited happy comical curious peculiar quaint quirky fancy wayward fickle yawning sleepy cockeyed dizzy dancing absurd laughing hairy smiling perplexed baffled cockamamie vulgar hoodwinked brainwashed".split(" "),"sapphire opal silver gold platinum ruby emerald topaz diamond amethyst turquoise starlit moonlit bronze metal jade amber garnet obsidian onyx pearl copper sunlit brass brassy metallic".split(" "),
"untuned loud soft shrieking melodious musical operatic symphonic dancing lyrical harmonic orchestral noisy dissonant rhythmic hissing singing crooning shouting screaming wailing crying howling yelling hollering caterwauling bawling bellowing roaring squealing beeping knocking tapping rapping humming scatting whispered whispering rasping buzzing whirring whistling whistled".split(" "),"nuclear apocalyptic desolate atomic zombie collapsed grim fallen collapsed cannibalistic radioactive toxic poisonous venomous disastrous grimy dirty undead bloodshot rusty glowing decaying rotten deadly plagued decimated rotting putrid decayed deserted acidic".split(" "),
"stupid idiotic fat ugly hideous grotesque dull dumb lazy sluggish brainless slow gullible obtuse dense dim dazed ridiculous witless daft crazy vapid inane mundane hollow vacuous boring insipid tedious monotonous weird bizarre backward moronic ignorant scatterbrained forgetful careless lethargic insolent indolent loitering gross disgusting bland horrid unseemly revolting homely deformed disfigured offensive cowardly weak villainous fearful monstrous unattractive unpleasant nasty beastly snide horrible syncophantic unhelpful bootlicking".split(" "),
"beautiful intelligent smart genius ingenious gorgeous pretty witty angelic handsome graceful talented exquisite enchanting fascinating interesting divine alluring ravishing wonderful magnificient marvelous dazzling cute charming attractive nifty delightful superior amiable gentle heroic courageous valiant brave noble daring fearless gallant adventurous cool enthusiastic fierce awesome radical tubular fearsome majestic grand stunning".split(" "),"scientific technical digital programming calculating formulating cyberpunk mechanical technological innovative brainy chemical quantum astro space theoretical atomic electronic gaseous investigative solar extinct galactic".split(" ")],
globalAdjectiveListLength=globalAdjectiveList.length,globalNounList=["flamingo hedgehog owl elephant pussycat alligator dachsund poodle beagle crocodile kangaroo wallaby woodpecker eagle falcon canary parrot parakeet hamster gerbil squirrel rat dove toucan raccoon vulture peacock goldfish rook koala skunk goat rooster fox porcupine llama grasshopper gorilla monkey seahorse wombat wolf giraffe badger lion mouse beetle cricket nightingale hawk trout squid octopus sloth snail locust baboon lemur meerkat oyster frog toad jellyfish butterfly caterpillar tiger hyena zebra snail pig weasel donkey penguin crane buzzard vulture rhino hippopotamus dolphin sparrow beaver moose minnow otter bat mongoose swan firefly platypus".split(" "),
"doctor lawyer ninja writer samurai surgeon clerk artist actor engineer mechanic comedian fireman nurse RockStar musician carpenter plumber cashier electrician waiter president governor senator scientist programmer singer dancer director mayor merchant detective investigator navigator pilot priest cowboy stagehand soldier ambassador pirate miner police".split(" "),"centaur wizard gnome orc troll sword fairy pegasus halfling elf changeling ghost knight squire magician witch warlock unicorn dragon wyvern princess prince king queen jester tower castle kraken seamonster mermaid psychic seer oracle".split(" "),
"violin flute bagpipe guitar symphony orchestra piano trombone tuba opera drums harpsichord harp harmonica accordion tenor soprano baritone cello viola piccolo ukelele woodwind saxophone bugle trumpet sousaphone cornet stradivarius marimbas bells timpani bongos clarinet recorder oboe conductor singer".split(" "),"murderer chainsaw knife sword murder devil killer psycho ghost monster godzilla werewolf vampire demon graveyard zombie mummy curse death grave tomb beast nightmare frankenstein specter poltergeist wraith corpse scream massacre cannibal skull bones undertaker zombie creature mask psychopath fiend satanist moon fullMoon".split(" "),
"slime bug roach fluid pus booger spit boil blister orifice secretion mucus phlegm centipede beetle fart snot crevice flatulence juice mold mildew germs discharge toilet udder odor substance fluid moisture garbage trash bug".split(" "),"mirror knife fork spork spoon tupperware minivan suburb lamp desk stereo television TV book car truck soda door video game computer calender tree plant flower chimney attic kitchen garden school wallet bottle".split(" "),"earrings ring necklace pendant choker brooch bracelet cameo charm bauble trinket jewelry anklet bangle locket finery crown tiara blingBling chain rosary jewel gemstone beads armband pin costume ornament treasure".split(" "),
"swamp graveyard cemetery park building house river ocean sea field forest woods neighborhood city town suburb country meadow cliffs lake stream creek school college university library bakery shop store theater garden canyon highway restaurant cafe diner street road freeway alley".split(" "),"robot alien raygun spaceship UFO rocket phaser astronaut spaceman planet star galaxy computer future timeMachine wormHole timeTraveler scientist invention martian pluto jupiter saturn mars quasar blackHole warpDrive laser orbit gears molecule electron neutrino proton experiment photon apparatus universe gravity darkMatter constellation circuit asteroid".split(" ")],
globalNounListLength=globalNounList.length,randomName=function(){var a=Math.floor(Math.random()*globalAdjectiveListLength),b=Math.floor(Math.random()*globalNounListLength),c=Math.floor(Math.random()*globalNounList[b].length);return"The "+globalAdjectiveList[a][Math.floor(Math.random()*globalAdjectiveList[a].length)].capitalize()+" "+globalNounList[b][c].capitalize()},makeRandomPizza=function(){for(var a="<li>",b=Math.floor(4*Math.random()),c=Math.floor(3*Math.random()),d=Math.floor(2*Math.random()),
e=0;e<b;e++)a=a+pizzaMeats[Math.floor(Math.random()*pizzaMeatsLength)]+"</li><li>";for(b=0;b<c;b++)a=a+pizzaNonmeats[Math.floor(Math.random()*pizzaNonmeatsLength)]+"</li><li>";for(c=0;c<d;c++)a=a+pizzaCheeses[Math.floor(Math.random()*pizzaCheesesLength)]+"</li><li>";return a=a+pizzaSauces[Math.floor(Math.random()*pizzaSaucesLength)]+"</li><li>"+pizzaCrusts[Math.floor(Math.random()*pizzaCrustsLength)]+"</li>"},pizzaElementGenerator=function(a){var b,c,d,e;b=document.createElement("div");c=document.createElement("div");
d=document.createElement("img");e=document.createElement("div");b.classList.add("randomPizzaContainer");b.style.width="33.33%";b.style.height="325px";b.id="pizza"+a;c.style.width="35%";d.src="../dist/img/pizza_205.png";d.classList.add("img-responsive");c.appendChild(d);b.appendChild(c);e.style.width="65%";a=document.createElement("h4");a.innerHTML=randomName();e.appendChild(a);a=document.createElement("ul");a.innerHTML=makeRandomPizza();e.appendChild(a);b.appendChild(e);return b},resizePizzas=function(a){window.performance.mark("mark_start_resize");
var b=document.querySelectorAll(".randomPizzaContainer"),c=b.length,d="";switch(a){case "1":document.querySelector("#pizzaSize").innerHTML="Small";d="25%";break;case "2":document.querySelector("#pizzaSize").innerHTML="Medium";d="33.33%";break;case "3":document.querySelector("#pizzaSize").innerHTML="Large";d="50%";break;default:console.log("bug in resizePizza size parameter")}for(a=0;a<c;a++)b[a].style.width=d;window.performance.mark("mark_end_resize");window.performance.measure("measure_pizza_resize",
"mark_start_resize","mark_end_resize");b=window.performance.getEntriesByName("measure_pizza_resize");console.log("Time to resize pizzas: "+b[b.length-1].duration+"ms")};
function generatePizzaDisplay(){window.performance.mark("mark_start_generating");for(var a=document.getElementById("randomPizzas"),b=2;100>b;b++)a.appendChild(pizzaElementGenerator(b));window.performance.mark("mark_end_generating");window.performance.measure("measure_pizza_generation","mark_start_generating","mark_end_generating");a=window.performance.getEntriesByName("measure_pizza_generation");console.log("Time to generate pizzas on load: "+a[0].duration+"ms")}window.addEventListener("load",generatePizzaDisplay);
