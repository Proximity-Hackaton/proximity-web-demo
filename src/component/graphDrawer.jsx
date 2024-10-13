import cytoscape from "cytoscape";
import { onMounted, onUpdated, reactive } from "vue"

const GraphDrawer = {
   props:['nodes', 'edges'],

   setup(props){

      const componentState = reactive({

         nodes: props.nodes ? props.nodes : [],
         edges: props.edges ? props.edges : [],
         
      });

      onMounted(function onMountedACB(){
         componentState.cyto = cytoscape({
            container: document.getElementById("cyto-graph"),
            style: [
               {
                   selector: 'node',
                   style: {
                       'background-color': '#A8D9D0',
                       'width': 'mapData(size, 0, 1, 20, 500)', 
                       'height': 'mapData(size, 0, 1, 20, 500)'
                   }
               },
               {
                  selector: 'edge',
                  style: {
                     'curve-style': 'bezier',
                     lineColor: '#FAFFFE',
                     'width': 5,                       // Edge width
                     'target-arrow-shape': 'triangle',
                     'target-arrow-color' : '#FAFFFE', // Shape of the arrow at the target end
                    
                  }
               }
            ],
         });
         
         for(let node of componentState.nodes){
            componentState.cyto.add({
               data:{id:node.nodeUUID, size:node.trust}
            })
         }
         for(let edge of componentState.edges){
            componentState.cyto.add({
               data:{
                  id:"e-"+edge.nodeSourceUUID+"-"+edge.nodeDestUUID+"-"+edge.timestamp,
                  source:edge.nodeSourceUUID,
                  target:edge.nodeDestUUID
               }
            });
         }
         componentState.cyto.layout({name:'circle', directed:true}).run();
         window.cyto = componentState.cyto;
      });

      function resetCyto(){
         componentState.cyto.destroy();
         componentState.cyto = cytoscape({
            container: document.getElementById("cyto-graph"),
            style: [
               {
                   selector: 'node',
                   style: {
                       'background-color': '#A8D9D0',
                       'width': 'mapData(size, 0, 1, 20, 100)', 
                       'height': 'mapData(size, 0, 1, 20, 100)'
                   }
               },
               {
                  selector: 'edge',
                  style: {
                    'curve-style': 'straight',
                    'lineColor':'#CDCCCE',
                    'width': 4,     
                    'target-arrow-shape': 'chevron', // Shape of the arrow at the target end
                    'target-arrow-color' : '#CDCCCE'
                  }
               }
            ]
         });
      }

      onUpdated(function onUpdatedACB(){
         console.log(props.nodes);
         resetCyto();
         for(let node of props.nodes){
            componentState.cyto.add({
               data:{id:"n"+node.nodeUUID, size:node.trust}
            })
         }
         for(let edge of props.edges){
            componentState.cyto.add({
               data:{
                  id:"e-"+"n"+edge.nodeSourceUUID+"-"+"n"+edge.nodeDestUUID+"-"+edge.timestamp,
                  source:"n"+edge.nodeSourceUUID,
                  target:"n"+edge.nodeDestUUID
               }
            });
         }
         componentState.cyto.layout({name:'circle', directed:true}).run();

      });

      return function render(){
         return <div className="graph-container" id="cyto-graph">
         
         </div>
      }
   }
}

export{GraphDrawer}