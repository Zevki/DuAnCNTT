import React from 'react'

const Footer = () => {
  return (
    <footer
      className="w-full h-[180px] 
        rounded-t-[24px] flex flex-col items-center justify-center
        bg-white bg-opacity-20 px-5"
    >
      <p className="text-sm font-[500px] mt-5 font-bold" style={{ textShadow: '0 0 3px #000, 0 0 5px #000' }}>
        Dự án Công Nghệ Thông Tin 2024
      </p>
      <hr className="w-full sm:w-[450px] border-t border-gray-400 mt-3" />
      <p className="text-sm font-[500px] mt-5" style={{ textShadow: '0 0 3px #000, 0 0 5px #000' }}>
        Nguyễn Tiến Đạt
      </p>
      <p className="text-sm font-[500px] mt-5" style={{ textShadow: '0 0 3px #000, 0 0 5px #000' }}>
        Tạ Quang Thắng
      </p>
</footer>

  )
}

export default Footer
