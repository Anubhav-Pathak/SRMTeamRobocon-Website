const images = document.querySelectorAll('.one'); 
    observer = new IntersectionObserver((entries)=>{ 
        entries.forEach(entry => {
           entry.target.classList.toggle("fadeIn", entry.isIntersecting)  
        }),{threshold: 1} 
    })
    images.forEach(imaged=>{
        observer.observe(imaged)
    })
	
	 

	const images3 = document.querySelectorAll('.three'); 
    observer3 = new IntersectionObserver((entries3)=>{ 
        entries3.forEach(entry => {
           entry.target.classList.toggle("fadeDown", entry.isIntersecting)  
        }),{threshold: 1}
    })
    images3.forEach(imaged=>{
        observer3.observe(imaged)
    })

	const images6 = document.querySelectorAll('.four'); 
    observer6 = new IntersectionObserver((entries6)=>{ 
        entries6.forEach(entry => {
           entry.target.classList.toggle("fadeLeft", entry.isIntersecting)  
        }),{threshold: 1}
    })
    images6.forEach(imagea=>{
        observer6.observe(imagea)
    })

	const images7 = document.querySelectorAll('.five'); 
    observer7 = new IntersectionObserver((entries7)=>{ 
        entries7.forEach(entry => {
           entry.target.classList.toggle("fadeRight", entry.isIntersecting)  
        }),{threshold: 1}
    })
    images7.forEach(imaged=>{
        observer7.observe(imaged)
    })