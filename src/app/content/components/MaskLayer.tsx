import { type FC } from 'react'

export const MaskLayer: FC = () => {
  return <div className="fixed inset-0 z-50 cursor-not-allowed bg-black opacity-10"></div>
}

MaskLayer.displayName = 'MaskLayer'
