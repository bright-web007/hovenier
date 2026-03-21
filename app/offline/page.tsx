export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-lg mx-auto text-center">
        <div className="mb-8">
          <div className="mx-auto w-24 h-24 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mb-6">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Geen internetverbinding
          </h1>
          
          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            Je bent momenteel offline. Controleer je internetverbinding en probeer het opnieuw. 
            Deze pagina werkt weer zodra je verbinding is hersteld.
          </p>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-green-100 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Contact informatie
            </h2>
            <div className="space-y-3 text-left">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-gray-700">
                  <strong>Telefoon:</strong> 06-28458538
                </span>
              </div>
              
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-700">
                  <strong>Locatie:</strong> Leeuwarden en omgeving
                </span>
              </div>
              
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-700">
                  <strong>Beschikbaar:</strong> Ma-Za 8:00-18:00
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Probeer opnieuw
            </button>
            
            <button
              onClick={() => window.history.go(-1)}
              className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            >
              Vorige pagina
            </button>
          </div>
        </div>

        <div className="text-sm text-gray-500 border-t border-gray-200 pt-6">
          <p className="mb-2">
            <strong>Hovenier Leeuwarden</strong> - Professionele Tuinonderhoud
          </p>
          <p>
            Tuinonderhoud • Boomverzorging • Haagknipwerk • Onkruidbestrijding
          </p>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}