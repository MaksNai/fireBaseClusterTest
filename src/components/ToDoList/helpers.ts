interface getDateArgs {
    seconds: number
    nanoseconds: number
  }

export function getDate({ seconds, nanoseconds }: getDateArgs): Date {
    const date = new Date(seconds * 1000)
    date.setMilliseconds(date.getMilliseconds() + nanoseconds / 1000000)
    return date
  }