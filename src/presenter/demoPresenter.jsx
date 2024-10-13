import { onMounted, onUpdated, reactive } from "vue";
import { DemoView } from "../views/demo";
import cytoscape from "cytoscape";

export function Demo(props){

   function onDepthChanged(depth){
      let d = parseInt(depth);
      props.model.resetDepthWrongType();
      if(isNaN(d)){
         props.model.setDepthWrongType();
      }
      props.model.setDepth(depth);
   }

   function onWalletIDChanged(walletId){
      props.model.setWalletId(walletId);
   }

   function onExploreClicked(){
      props.model.onExploreClicked();
   }

   function onTrustScoreChanged(b){
      if(b){
         props.model.setTrustScore();
      }else{
         props.model.resetTrustScore();
      }
   }
   
   function onTimeFrameChanged(timeFrame){
      let d = parseInt(timeFrame);
      props.model.setTimeFrame(timeFrame);
      props.model.resetTimeFrameWrongType();
      if(isNaN(d)){
         props.model.setTimeFrameWrongType();
      }
   }

      
   return <DemoView 
      edges={props.model.edges}
      nodes={props.model.nodes}
      walletId={props.model.walletId} 
      depth={props.model.depth} 
      timeFrame={props.model.timeFrame}
      depthWrongType={props.model.depthWrongType}
      timeFrameWrongType={props.model.timeFrameWrongType}
      onDepthChanged={onDepthChanged}
      onWalletIDChanged={onWalletIDChanged}
      onExploreClicked={onExploreClicked}
      onTrustScoreChanged={onTrustScoreChanged}
      onTimeFrameChanged={onTimeFrameChanged}
      exploreDisabled={!props.model.depth || !props.model.walletId || !props.model.timeFrame || props.model.depthWrongType || props.model.timeFrameWrongType}
   ></DemoView>
      
}

