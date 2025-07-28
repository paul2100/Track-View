import React, { useMemo } from 'react'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import fr from 'date-fns/locale/fr'


function CalendarTrade({ groupeTrades = {} }) {
  const locales = { fr }
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  })






  return (
    <div className=''>
      <div className='h-140 w-full'>
        <Calendar
          localizer={localizer}
          events={''}
          startAccessor="start"
          endAccessor="end"
          defaultDate={new Date()}
          className='bg-white text-black'
        />
      </div>
    </div>
  )
}

export default CalendarTrade
