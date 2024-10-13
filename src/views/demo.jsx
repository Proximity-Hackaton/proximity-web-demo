import cytoscape from "cytoscape";
import { GraphDrawer } from "../component/graphDrawer";

export function DemoView(props){

   function depthChangeListener(e){
      console.log("depth changed");
      props.onDepthChanged(e.target.value);
   }

   function walletIdListener(e){
      props.onWalletIDChanged(e.target.value);
   }

   function timeFrameListener(e){
      props.onTimeFrameChanged(e.target.value);
   }

   function exploreListener(){
      console.log("clicked");
      props.onExploreClicked();
   }

   function trustScoreListener(e){
      props.onTrustScoreChanged(e.target.checked);
   }
   
   return <div className="demo-container">
      <div className="sidebar">
         <p className="title">Proximity</p>
         <div className="sidebar-form">
            <div className="form-label-container">
               <label className="form-label" for="walletId">Wallet UID</label>
            </div>
            <input 
               id="sidebar-form-walletid" 
               name="walletId"
               className="form-label-input" 
               value={props.walletId ? props.walletId : ""}
               type="text"
               onChange={walletIdListener}
               placeholder="0x02a212de6a9dfa3a69e22387acfbafbb1a9e591bd9d636e7895dcfc8de05f331"
            ></input>

            <div className="form-label-container">
               <label className="form-label" for="depth">Depth</label>
               <span className="red form-label-subtext">               
                  {props.depthWrongType ? "Must be an integer": ""}
               </span>
            </div>
            <input 
               id="sidebar-form-depth" 
               name="depth"
               className="form-label-input" 
               value={props.depth ? props.depth : ""}
               type="text"
               placeholder="0"
               onInput={depthChangeListener}
            ></input>

            <div className="form-label-container">
               <label className="form-label" for="timeframe">Time Frame (min)</label>
               <span className="red form-label-subtext">               
                  {props.timeFrameWrongType ? "Must be an integer": ""}
               </span>
            </div>
            <input 
               id="sidebar-form-timeframe" 
               name="timeframe"
               className="form-label-input" 
               value={props.timeFrame ? props.timeFrame : ""}
               type="text"
               placeholder="0"
               onInput={timeFrameListener}
            ></input>

            <div className="form-label-container">
               <label className="form-label" for="trust-scores">Trust scores</label>
            </div>
            <div>
               <input 
               id="sidebar-form-trustscores" 
               name="trust-scores"
               className="form-label-input" 
               value={props.timeFrame ? props.timeFrame : ""}
               type="checkbox"
               onChange={trustScoreListener}
               ></input>
            </div>
            

            <button 
               className="sidebar-form-button" 
               disabled={props.exploreDisabled} 
               onClick={exploreListener}>Explore</button>

         </div>
      </div>
      <GraphDrawer nodes={props.nodes} edges={props.edges}></GraphDrawer>      
   </div>
}