/////////// IMPORTS
///
// import classes from './App.module.css'
import useFetch from './hooks/useFetch';
///
/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const App = ()=>{
/////////// VARIABLES
///

///
/////////// CUSTOM HOOKS
///
const {data, error, loading} = useFetch(`${process.env.REACT_APP_SERVER}/words`)
console.log(data);
///
/////////// STATES
///

///
/////////// SIDE EFFECTS
///

///
/////////// IF CASES
///

///
/////////// EVENTS
///

///
/////////// FUNCTIONS
///

///
return <>

</>
}