import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");

const makePromise = ({ value, delay, shouldResolve}) => {
  return new Promise((resolve, reject) => {
	   setTimeout(() => {
				if(shouldResolve) {
					resolve(`✅ Fulfilled promise in ${delay}ms`)
				} else {
					reject(`❌ Rejected promise in ${delay}ms`)
				}
			}, delay);
  });
};

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const delayValue = Number(event.currentTarget.elements.delay.value);
    const selectedState = event.currentTarget.elements.state.value;
    const shouldResolve = selectedState === "fulfilled";


    makePromise({ value: "promise-result", delay: delayValue, shouldResolve })
        .then(message => {
            iziToast.success({
                message: message,
                position: "topRight",
                pauseOnHover: false,
                progressBar: false,
                closeOnClick: true,
                close: false,
                icon: '',
            });
            console.log(message);
        })
        .catch(message => {
            iziToast.error({
                message: message,
                position: "topRight",
                pauseOnHover: false,
                progressBar: false,
                closeOnClick: true,
                close: false,
                icon: '',
            });
            console.log(message)
        });
    
    event.currentTarget.reset()
})
