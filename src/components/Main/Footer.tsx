function Footer() {
  return (
    <footer className="mb-2 flex flex-col justify-center text-center text-base font-thin">
      {process.env.NODE_ENV !== 'production' && (
        <small>
          You are running this application in <b>{process.env.NODE_ENV}</b>{' '}
          mode.
        </small>
      )}
      <a target="_blank" rel="noreferrer" href="https://nac.in.ua">
        nac.in.ua
      </a>
    </footer>
  )
}

export default Footer
