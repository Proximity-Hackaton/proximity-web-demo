
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
   trustScore: false,

   setTrustScore : function (){
      this.trustScore = true;
   },

   resetTrustScore : function (){
      this.trustScore = false;
   },

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
   
      this.walletIdNotFound = false;

      if(this.useFakeDb){
         fetch("http://localhost:8080/fakeRawNeighborhood?" + "source="+ this.walletId+"&depth="+this.depth+"&minTimeStamp="+this.timeFrame+"&maxTimeStamp="+100)
            .then((response) => response.json()).then((json) => {this.nodes = json.nodes; this.edges = json.edges}).catch((e) => this.walletIdNotFound = true);
      
      }else{
         if(this.trustScore){
            fetch("http://localhost:8080/trustedNeighborhood?" + "source="+ this.walletId+"&depth="+this.depth+"&minTimeStamp="+(Date.now()-this.timeFrame*60000)+"&maxTimeStamp="+Date.now())
            .then((response) => response.json()).then((json) => {this.nodes = json.nodes; this.edges = json.edges}).catch((e) => this.walletIdNotFound = true);
             
         }else{
            fetch("http://localhost:8080/rawNeighborhood?" + "source="+ this.walletId+"&depth="+this.depth+"&minTimeStamp="+(Date.now()-this.timeFrame*60000)+"&maxTimeStamp="+Date.now())
               .then((response) => response.json()).then((json) => {this.nodes = json.nodes; this.edges = json.edges}).catch((e) => this.walletIdNotFound = true);
      
         }
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