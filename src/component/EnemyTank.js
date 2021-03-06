// 引入第一类敌方坦克 基础的敌方坦克
import {
  h,
  defineComponent,
  toRefs,
  computed,
  onMounted,
  onUnmounted
} from "@vue/runtime-core";
import enemyTankImgD from "../../assets/enemy1D.gif";
import enemyTankImgL from "../../assets/enemy1L.gif";
import enemyTankImgR from "../../assets/enemy1R.gif";
import enemyTankImgU from "../../assets/enemy1U.gif";
import  ENEMY_TANK_TYPE1_FIRE_INTERVAL from "../gameconfig/game-config";
import Blast from "../../assets/blast7.gif";
import { firePointTransform } from "../utils/index";

export default defineComponent({
  props: ["x", "y", "direction", "status"],


  setup(props, { emit }) {
    const { x, y, direction, status } = toRefs(props);   
    const TankImg = computed(() => {
      if(status.value === 'DEAD') {
        // 坦克死亡 展示 爆炸图像
        return Blast;
      }
      if (direction.value === "TOP") {
        return enemyTankImgU;
      } else if (direction.value === "LEFT") {
        return enemyTankImgL;
      } else if (direction.value === "RIGHT") {
        return enemyTankImgR;
      } else if (direction.value === "DOWN") {
        return enemyTankImgD;
      }
    });


    function enemyFire() {
      emit("attack", firePointTransform({x, y, direction}));
    }

    let timeIntervalReturnedValue;
    onMounted(() => {
      //每四秒发射一颗子弹
      timeIntervalReturnedValue = setInterval(enemyFire, ENEMY_TANK_TYPE1_FIRE_INTERVAL);
    });
  
    onUnmounted(() => {
      //清除 定时器 释放内存
      clearInterval(timeIntervalReturnedValue);
    });
    return {
      x,
      y,
      TankImg
    };
  },
  render(ctx) {
    return h("Container", { x: ctx.x, y: ctx.y }, [
      h("Sprite", { texture: ctx.TankImg }),
    ]);
  },
});
