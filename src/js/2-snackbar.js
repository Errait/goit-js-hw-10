import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");

const makePromise = ({ delay, shouldResolve}) => {
  return new Promise((resolve, reject) => {
	   setTimeout(() => {
				if(shouldResolve) {
					resolve(delay)
				} else {
					reject(delay)
				}
			}, delay);
  });
};

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const delayValue = Number(event.currentTarget.elements.delay.value);
    const selectedState = event.currentTarget.elements.state.value;
    const shouldResolve = selectedState === "fulfilled";


    makePromise({ delay: delayValue, shouldResolve })
        .then(delay => {
            const message = `✅ Fulfilled promise in ${delay}ms`;
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
        .catch(delay => {
            const message = `❌ Rejected promise in ${delay}ms`;
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
