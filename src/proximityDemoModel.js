
export default{

   nodes:[
     
   ],

   edges: [
      
   ],

   depth: null,
   walletId: null,

   depthWrongType: false,
   timeFrameWrongType: false,
   walletIdNotFound:false,

   useFakeDb: false,

   setDepth : function (depth){
      this.depth = depth;
   },

   setDepthWrongType : function (){
      this.depthWrongType = true;
      console.log("setting depth wrong type");
   },

   resetDepthWrongType : function (){
      this.depthWrongType = false;
   },

   setTimeFrameWrongType : function (){
      this.timeFrameWrongType = true;
   },

   resetTimeFrameWrongType : function (){
      this.timeFrameWrongType = false;
   },

   setWalletId : function (walletId){
      this.walletId = walletId;
   },

   onExploreClicked : function (){
   
      if(this.useFakeDb){
         this.walletIdNotFound = false;
         fetch("http://localhost:8080/fakeRawNeighborhood?" + "source="+ this.walletId+"&depth="+this.depth+"&minTimeStamp="+this.timeFrame+"&maxTimeStamp="+100)
            .then((response) => response.json()).then((json) => {this.nodes = json.nodes; this.edges = json.edges});
      
      }else{
         this.walletIdNotFound = false;
         fetch("http://localhost:8080/rawNeighborhood?" + "source="+ this.walletId+"&depth="+this.depth+"&minTimeStamp="+(Date.now()-this.timeFrame*60000)+"&maxTimeStamp="+Date.now())
            .then((response) => response.json()).then((json) => {this.nodes = json.nodes; this.edges = json.edges});
      
      }
   },

   setTimeFrame : function (timeFrame){
      this.timeFrame = timeFrame;
   },

   /* 
   Node
   {
      wallet_address:0,
      trust:5,
   }

   Edge
   {
      n1:wallet_address1,
      n2:wallet_address2,
      time
   }
   */

}