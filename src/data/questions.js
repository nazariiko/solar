const questions = [
  {
    question: 'Wo möchten Sie die Solaranlage installieren?',
    options: [
      {
        id: 1,
        text: 'Ein-/Zweifamilienhaus',
        icon: null
      },
      {
        id: 2,
        text: 'Mehrfamilienhaus',
        icon: null
      },
      {
        id: 3,
        text: 'Gewerbeimmobilie',
        icon: null
      },
      {
        id: 4,
        text: 'Agrarbetrieb',
        icon: null
      },
      {
        id: 5,
        text: 'Freifläche',
        icon: null
      },
    ],
    progress: 15,
  },
  {
    question: 'Wie möchten Sie den Solarstrom nutzen?',
    options: [
      {
        id: 1,
        text: 'Eigenverbrauch',
        icon: null
      },
      {
        id: 2,
        text: 'Netzeinspeisung',
        icon: null
      },
      {
        id: 3,
        text: 'Beides',
        icon: null
      },
    ],
    progress: 25,
  },
  {
    question: 'Wie groß ist die geplante PV Dachfläche?',
    options: [
      {
        id: 1,
        text: '0-100m2',
        icon: null
      },
      {
        id: 2,
        text: '100-500m2',
        icon: null
      },
      {
        id: 3,
        text: 'über 500m2',
        icon: null
      },
      {
        id: 4,
        text: 'unentschieden',
        icon: null
      },
    ],
    progress: 40,
  },
  {
    question: 'Möchten Sie die Anlage kaufen oder mieten?',
    options: [
      {
        id: 1,
        text: 'Kaufen',
        icon: null
      },
      {
        id: 2,
        text: 'Mieten',
        icon: null
      },
      {
        id: 3,
        text: 'Beides interessant',
        icon: null
      },
    ],
    progress: 55,
  },
  {
    question: 'Haben Sie Interesse an einem Stromspeicher, um Ihr Einsparpotential zu maximieren?',
    options: [
      {
        id: 1,
        text: 'Ja',
        icon: null
      },
      {
        id: 2,
        text: 'Nein',
        icon: null
      },
      {
        id: 3,
        text: 'Nicht sicher',
        icon: null
      },
    ],
    progress: 70,
  },
  {
    question: 'Wie alt ist ihr Dach?',
    options: [
      {
        id: 1,
        text: 'Noch in Planung',
        icon: null
      },
      {
        id: 2,
        text: 'Fast neu',
        icon: null
      },
      {
        id: 3,
        text: 'nach 1990',
        icon: null
      },
      {
        id: 4,
        text: 'bis 1990',
        icon: null
      },
    ],
    progress: 85,
  },
  {
    question: 'Wo soll die Solaranlage installiert werden?',
    options: null,
    progress: 99
  }
]

export default questions;