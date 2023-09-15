import { Fragment } from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

import { Button, ButtonStyle } from '@/components/utils/Button';

export function RenderMermaid({ svg }: { svg: string }) {
  return (
    <div className="zoomable-div h-full w-full">
      <TransformWrapper
        initialScale={1}
        initialPositionX={1}
        initialPositionY={1}
        maxPositionX={100}
      >
        {({ zoomIn, zoomOut, resetTransform, zoomToElement, ...rest }) => (
          <Fragment>
            <div className="tools mx-8 mb-2 flex justify-end space-x-4 px-4">
              <Button
                info={{
                  label: '+',
                  onClick: () => zoomIn(),
                  style: ButtonStyle.Hollow,
                  removeMinWidth: true,
                  labelClasses: 'text-base',
                  removePadding: true,
                  className: 'px-2',
                }}
              />
              <Button
                info={{
                  label: '-',
                  onClick: () => zoomOut(),
                  style: ButtonStyle.Hollow,
                  removeMinWidth: true,
                  labelClasses: 'text-base',
                  removePadding: true,
                  className: 'px-2',
                }}
              />
              <Button
                info={{
                  label: 'Reset',
                  onClick: () => resetTransform(),
                  style: ButtonStyle.Hollow,
                  removeMinWidth: true,
                  // labelClasses: "text-base",
                  removePadding: true,
                  className: 'px-2',
                }}
              />
            </div>
            <div className="m-2 h-[75vh] min-h-[17rem] border-2 border-surface p-4">
              <TransformComponent contentClass="" wrapperClass="w-full">
                <div
                  id="conatiner"
                  className="flex w-full justify-center"
                  dangerouslySetInnerHTML={{ __html: svg }}
                ></div>
              </TransformComponent>
            </div>
          </Fragment>
        )}
      </TransformWrapper>
    </div>
  );
}
