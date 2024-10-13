export default function resolvePromise(prms, promiseState, message){

   promiseState.promise = prms;
   promiseState.data = null;
   promiseState.error = null;

   if(prms === null) return;
   prms.then(function dataACB(data){
       if(promiseState.promise === prms){
           promiseState.data=data;
           //console.log(message);
       }
   }).catch(function errorACB(error){
       if(promiseState.promise === prms){
           promiseState.error = error;
       }
   });
}