

const subscribers: ((working: number) => void)[] = [];
let working = 0;

function incrementWorking() {
  subscribers.forEach((subscriber) => subscriber(++working));
}

function decrementWorking() {
  working = Math.max(working - 1, 0);
  subscribers.forEach((subscriber) => subscriber(working));
}

export default () => {
  return {
    working: !!working,
    incrementWorking,
    decrementWorking,
    subscribeToWorking(callback: (working: number) => void) {
      subscribers.push(callback);
    },
    unsubscribeFromWorking(callback: (working: number) => void) {
      const index = subscribers.indexOf(callback);
      if(index >= 0){
        subscribers.splice(index, 1);
      }else{
        console.error('Attempted to unsubscribe callback which was not subscribed!', callback);
      }
    }
  };
};
