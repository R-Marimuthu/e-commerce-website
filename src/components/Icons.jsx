export function IconSearch(props) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
      <line x1="21" y1="21" x2="16.2" y2="16.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export function IconBag(props) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M6 8h12l-1 13H7L6 8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export function IconClose(props) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...props}>
      <line x1="5" y1="5" x2="19" y2="19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="19" y1="5" x2="5" y2="19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export function IconMinus(props) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" {...props}>
      <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function IconPlus(props) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" {...props}>
      <line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

// Category glyphs — kept deliberately schematic/technical, not illustrative.
export function CategoryGlyph({ category, ...props }) {
  switch (category) {
    case 'Headphones':
      return (
        <svg viewBox="0 0 64 64" fill="none" {...props}>
          <path d="M12 34v-4a20 20 0 0 1 40 0v4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          <rect x="8" y="32" width="10" height="16" rx="3" stroke="currentColor" strokeWidth="2.2" />
          <rect x="46" y="32" width="10" height="16" rx="3" stroke="currentColor" strokeWidth="2.2" />
        </svg>
      )
    case 'Speakers':
      return (
        <svg viewBox="0 0 64 64" fill="none" {...props}>
          <rect x="18" y="8" width="28" height="48" rx="3" stroke="currentColor" strokeWidth="2.2" />
          <circle cx="32" cy="22" r="6" stroke="currentColor" strokeWidth="2.2" />
          <circle cx="32" cy="42" r="9" stroke="currentColor" strokeWidth="2.2" />
        </svg>
      )
    case 'Turntables':
      return (
        <svg viewBox="0 0 64 64" fill="none" {...props}>
          <rect x="8" y="10" width="48" height="40" rx="3" stroke="currentColor" strokeWidth="2.2" />
          <circle cx="26" cy="30" r="14" stroke="currentColor" strokeWidth="2.2" />
          <circle cx="26" cy="30" r="2.5" fill="currentColor" />
          <path d="M44 18 L52 14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      )
    case 'Amplifiers':
      return (
        <svg viewBox="0 0 64 64" fill="none" {...props}>
          <rect x="8" y="18" width="48" height="28" rx="3" stroke="currentColor" strokeWidth="2.2" />
          <circle cx="22" cy="32" r="7" stroke="currentColor" strokeWidth="2.2" />
          <circle cx="44" cy="32" r="7" stroke="currentColor" strokeWidth="2.2" />
        </svg>
      )
    default:
      return (
        <svg viewBox="0 0 64 64" fill="none" {...props}>
          <path d="M14 34c6-14 30-14 36 0" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="14" cy="38" r="4" stroke="currentColor" strokeWidth="2.2" />
          <circle cx="50" cy="38" r="4" stroke="currentColor" strokeWidth="2.2" />
        </svg>
      )
  }
}
