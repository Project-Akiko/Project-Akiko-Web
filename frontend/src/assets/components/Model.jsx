import { useEffect, useState, useRef } from "react";
import * as PIXI from "pixi.js";
import { config } from 'pixi-live2d-display';
import { Live2DModel } from "pixi-live2d-display/cubism4";

window.PIXI = PIXI;

const Model = ({ character }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [initialX, setInitialX] = useState(0);
  const [initialY, setInitialY] = useState(0);
  const [xOffset, setXOffset] = useState(0);
  const [yOffset, setYOffset] = useState(0);
  const [model, setModel] = useState(false);

  useEffect(() => {
    const modelUrl = `/src/shared_data/advanced_characters/${character.char_id}/Live2D/${character.char_id}.model3.json`;
    fetch(modelUrl)
      .then(response => response.blob())
      .then(blob => {
        // play sound for motions
        config.sound = true;

        // defer the playback of a motion and its sound until both are loaded
        config.motionSync = true;
        config.cubism4.supportMoreMaskDivisions = true;
        config.motionFadingDuration = 500;
        config.idleMotionFadingDuration = 500;
        config.expressionFadingDuration = 500;
        const app = new PIXI.Application({
          view: avatarRef.current,
          autoStart: true,
          backgroundAlpha: 0,
          width: 500,
          height: window.innerHeight - 200,
        });

        Live2DModel.from(blob, { idleMotionGroup: 'main_idle' }).then((model) => {
          app.stage.addChild(model);
          model.anchor.set(.5, 0.37);
          model.scale.set(.25, .25);
          model.interactive = true;
          model.motion('tap_body', 0);
          model.x = app.screen.width / 2;
          model.y = app.screen.height / 2;
          model.on('hit', (hitAreaNames) => {
            if (hitAreaNames.includes('body')) {
                // body is hit
            }
          });
        });
        setModel(true);
      })
      .catch(error => {
        console.error(`Error loading model ${modelUrl}: ${error}`);
        setModel(false);
      });
  }, []);

  const avatarRef = useRef(null);
  let currentX;
  let currentY;

  const handleMouseDown = (e) => {
    setInitialX(e.clientX - xOffset);
    setInitialY(e.clientY - yOffset);

    if (e.target === avatarRef.current) {
      setIsDragging(true);
    }
  };

  const handleTouchStart = (e) => {
    setInitialX(e.touches[0].clientX - xOffset);
    setInitialY(e.touches[0].clientY - yOffset);

    if (e.target === avatarRef.current) {
      setIsDragging(true);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;

      setXOffset(currentX);
      setYOffset(currentY);

      setTranslate(currentX, currentY, avatarRef.current);
    }
  };

  const handleTouchMove = (e) => {
    if (isDragging) {
      currentX = e.touches[0].clientX - initialX;
      currentY = e.touches[0].clientY - initialY;

      setXOffset(currentX);
      setYOffset(currentY);

      setTranslate(currentX, currentY, avatarRef.current);
    }
  };

  const setTranslate = (xPos, yPos, el) => {
    el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
  };
  return (
    <>
      {model !== false && (
      <>
      <canvas className='Live2D-canvas'id="canvas"           
        ref={avatarRef}
        draggable={false}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}/>
      </>
    )}
    </>
  )
}

export default Model;
