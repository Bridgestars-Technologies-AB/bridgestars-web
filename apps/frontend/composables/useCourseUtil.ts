namespace CourseUtil {
  export const courses: { header: string; course: string }[] = [
    {
      header: "Bridge A",
      course: "my-courses-bridgeA",
    },
    {
      header: "Bridge B",
      course: "my-courses-bridgeB",
    },
    {
      header: "Avancerad",
      course: "my-courses-advanced",
    },
    {
      header: "Expert",
      course: "my-courses-expert",
    },
    {
      header: "Master Class",
      course: "my-courses-master-class",
    },
    {
      header: "BridgeBertheau-NT",
      course: "my-courses-bridge-bertheau",
    },
  ];

  export const bridgeA = [
    {
      header: "Öppningsbudet 1 NT",
      course: "bidding",
    },
    {
      header: "Öppningsbudet 1 i färg",
      course: "bidding",
    },
    {
      header: "Öppningsbudet 2 NT",
      course: "bidding",
    },
    {
      header: "SH:s 1:a bud och ÖH:s 2:a bud",
      course: "bidding",
    },
    {
      header: "2-över 1 och HANDTYP",
      course: "bidding",
    },
    {
      header: "Inkliv",
      course: "bidding",
    },
    {
      header: "Sammanfattning",
      course: "bidding",
    },
  ];

  export const bridgeB = [
    {
      header: "Svarshanden 2:a bud",
      course: "bidding",
    },
    {
      header: "Trumfstöd, Stenberg oh Essfråga",
      course: "bidding",
    },
    {
      header: "Upplysningsdubbling",
      course: "bidding",
    },
  ];

  export const advanced = [
    {
      header: "2 Klöver",
      course: "bidding",
    },
    {
      header: "Fjärde färg",
      course: "bidding",
    },
    {
      header: "Hand typ, Hand typ, Hand typ",
      course: "bidding",
    },
  ];

  export const expert = [
    {
      header: "2 över 1",
      course: "bidding",
    },
    {
      header: "SKROT",
      course: "bidding",
    },
    {
      header: "Spärrbud på 2-läget",
      course: "bidding",
    },
  ];

  export const masterClass = [
    {
      header: "Olas kluringar",
      course: "bidding",
    },
  ];

  export const bridgeBertheau = [
    {
      header: "1 NT",
      course: "bidding",
    },
  ];
}

export { CourseUtil };
