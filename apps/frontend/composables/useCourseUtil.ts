namespace CourseUtil {
  export const courses: { header: string; url: string }[] = [
    {
      header: "Bridge A",
      url: "courses-bridgeA",
    },
    {
      header: "Bridge B",
      url: "courses-bridgeB",
    },
    {
      header: "Avancerad",
      url: "courses-advanced",
    },
    {
      header: "Expert",
      url: "courses-expert",
    },
    {
      header: "Master Class",
      url: "courses-master-class",
    },
    {
      header: "BridgeBertheau-NT",
      url: "courses-bridge-bertheau",
    },
  ];

  export const bridgeA = [
    {
      header: "Öppningsbudet 1 NT",
      url: "bidding-problems",
    },
    {
      header: "Öppningsbudet 1 i färg",
      url: "bidding-problems",
    },
    {
      header: "Öppningsbudet 2 NT",
      url: "bidding-problems",
    },
    {
      header: "SH:s 1:a bud och ÖH:s 2:a bud",
      url: "bidding-problems",
    },
    {
      header: "2-över 1 och HANDTYP",
      url: "bidding-problems",
    },
    {
      header: "Inkliv",
      url: "bidding-problems",
    },
    {
      header: "Sammanfattning",
      url: "bidding-problems",
    },
  ];

  export const bridgeB = [
    {
      header: "Svarshanden 2:a bud",
      url: "bidding-problems",
    },
    {
      header: "Trumfstöd, Stenberg oh Essfråga",
      url: "bidding-problems",
    },
    {
      header: "Upplysningsdubbling",
      url: "bidding-problems",
    },
  ];

  export const advanced = [
    {
      header: "2 Klöver",
      url: "bidding-problems",
    },
    {
      header: "Fjärde färg",
      url: "bidding-problems",
    },
    {
      header: "Hand typ, Hand typ, Hand typ",
      url: "bidding-problems",
    },
  ];

  export const expert = [
    {
      header: "2 över 1",
      url: "bidding-problems",
    },
    {
      header: "SKROT",
      url: "bidding-problems",
    },
    {
      header: "Spärrbud på 2-läget",
      url: "bidding-problems",
    },
  ];

  export const masterClass = [
    {
      header: "Olas kluringar",
      url: "bidding-problems",
    },
  ];

  export const bridgeBertheau = [
    {
      header: "1 NT",
      url: "bidding-problems",
    },
  ];
}

export { CourseUtil };
