import { createRouter, createWebHashHistory } from 'vue-router'
import { Demo } from '../presenter/demoPresenter';

function router(model){
  return createRouter({
    history: createWebHashHistory(),
    routes: [
      {
        path: '/',
        component: <Demo 
            walletId={model.walletId} 
            depth={model.depth} 
            timeFrame={model.timeFrame} 
            timeFrameWrongType= {model.timeFrameWrongType}
            depthWrongType= {model.depthWrongType}
            model={model}
         />,
      },
    ]
  });
} 


export default router
