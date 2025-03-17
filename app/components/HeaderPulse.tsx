import React from 'react';

type HeaderPulseProps = {
  size?: 'small' | 'medium' | 'large';
  color: 'blue' | 'green' | 'purple'
}

const HeaderPulse = ({ size = 'medium', color = 'blue' }: HeaderPulseProps) => {
  const sizeClasses = {
    small: 'size-4',
    medium: 'size-12',
    large: 'size-16'
  }

  const colorClasses = {
    blue: 'bg-blue-500 shadow-[0_0_8px_4px_rgba_(59,130,246,0.5)]',
    green: 'bg-green-500 shadow-[0_0_8px_4px_rgba_(34,197,94,0.5)]',
    purple: 'bg-purple-500 shadow-[0_0_8px_4px_rgba_(168,85,247,0.5)]'
  }

  return (
    <div className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-pulse`} />
  )
}

export default HeaderPulse
