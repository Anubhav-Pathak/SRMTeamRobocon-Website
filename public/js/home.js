
window.addEventListener('load', function () {
    // Count Up Animation
    var members_count = document.getElementById("members_count");
    var participations_count = document.getElementById("participations_count");
    var robots_count = document.getElementById("robots_count");
    var alumini_count = document.getElementById("alumini_count");

    function increase(element = {}, x, speed) {
        let counts = setInterval(updated,speed);
        let upto = 0;

        function updated() {
            element.innerHTML = ++upto + "<span class=\"text-red-600\">+</span>";
            if (upto === x) {
                clearInterval(counts);
            }
        }
    }

    // Date count down
    var countDownDate = new Date("Aug 27, 2023 00:00:00").getTime();

    var x = setInterval(function () {

        var now = new Date().getTime();

        var distance = countDownDate - now;

        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);



        // Display the result in the element with id="demo"
        document.getElementById("countdown").innerHTML = days + "d" + " : " + hours + "h" + " : " + minutes + "m" + " : " + seconds + "s ";

        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("demo").innerHTML = "EXPIRED";
        }
    }, 1000);


    // Intersection observers

    // Counters

    function count_intersection_animation(element, x, speed){
        const callback = (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    increase(element, x, speed);
                }
            })
        }
    
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 1
          }
        const myObserver = new IntersectionObserver(callback, options)
        myObserver.observe(element)
    }

    count_intersection_animation(members_count, 65,1/65*1000)
    count_intersection_animation(participations_count, 6,1/6*1000)
    count_intersection_animation(robots_count, 11,1/11*1000)
    count_intersection_animation(alumini_count, 100,1/100*1000)


    // Robo character intersection observer animations
    var robo1 = this.document.getElementById("bot-1");
    const robo1_callback = (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                robo1.classList.add("animate-jumping-bot1")
            }
        })
    }

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0
      }
    const myObserver = new IntersectionObserver(robo1_callback, options)
    myObserver.observe(robo1)

    var robo2 = this.document.getElementById("bot-2");
    const robo2_callback = (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                robo2.classList.add("animate-jumping-bot2")
            }
        })
    }

    const options1 = {
        root: null,
        rootMargin: '0px',
        threshold: 0
      }
    const myObserver1 = new IntersectionObserver(robo2_callback, options1)
    myObserver1.observe(robo2)


})

