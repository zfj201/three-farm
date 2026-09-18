# 晨露农场 · three-farm

用 **React + React Three Fiber** 做的第三人称 3D 农场 Demo，适合作为前端 / 图形向简历项目。

玩家控制 Three.js 官方的 `RobotExpressive`，在两块 **4×3** 菜地上种植、等待成长、收获，再到售货摊买卖。

## 运行

```bash
npm install
npm run dev
```

构建：

```bash
npm run build
npm run preview
```

打开终端提示的本地地址（默认 `http://localhost:5173`）。建议用桌面浏览器，需要键盘。

## 操作

| 按键 | 作用 |
| --- | --- |
| W A S D / 方向键 | 移动 |
| Shift | 跑步 |
| 鼠标拖拽 | 旋转第三人称镜头 |
| E | 种植 / 收获 / 打开或关闭商店 |
| 1 / 2 / 3 | 选择胡萝卜 / 番茄 / 玉米种子 |
| 点击快捷栏 | 同样可以选种子 |

走到格子上才会种收，不能用鼠标点地。成长是十秒级，方便演示完整循环。

## 技术点（简历可写）

- React Three Fiber 声明式 3D 场景，和 React HUD / 商店弹层共存
- GLTF 角色动画状态机：Idle / Walking / Running，种收时播 Wave、Punch
- 第三人称跟随相机 + 鼠标绕角色旋转，移动方向相对镜头
- 角色 XZ 投影到 24 个农田格子的空间查询
- Zustand 保存金币、背包、格子生命周期，和 Three 渲染解耦
- 程序化作物网格（胡萝卜 / 番茄 / 玉米）随时间缩放和换阶段
- 日夜循环改变太阳位置、光色和雾
- `localStorage` 自动存档，HUD 可重置农场

## 目录

```
src/
  data/          作物与地图常量
  store/         Zustand 状态和存档
  systems/       成长与格子检测（纯逻辑）
  experience/    R3F 场景、角色、农田、世界
  ui/            HUD、商店、教程
```

角色模型来自 [Three.js RobotExpressive](https://github.com/mrdoob/three.js/tree/master/examples/models/gltf/RobotExpressive)（CC0），放在 `public/models/`。

## 后续可加

浇水加速、Leva 调试板、移动端虚拟摇杆、环境音效。
