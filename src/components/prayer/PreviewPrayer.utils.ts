export const formElMalehText = (elMalehName: string | undefined) => {
  const firstPartPrayer = `אֵל מָלֵא רַחֲמִים, שׁוֹכֵן בַּמְּרוֹמִים, הַמְצֵא מְנוּחָה נְכוֹנָה עַל כַּנְפֵי הַשְּׁכִינָה, בְּמַעֲלות קְדוֹשִׁים וּטְהוֹרִים כְּזֹהַר הָרָקִיעַ מַזְהִירִים, אֶת נִשְׁמַת`;
  const secondPartPrayer = `שֶׁהָלַךְ לְעוֹלָמוֹ, בַּעֲבוּר שֶׁבְּלִי נֶדֶר אֶתֵּן צְדָקָה בְּעַד הַזְכַּרַת נִשְׁמָתוֹ, בְּגַן עֵדֶן תְּהֵא מְנוּחָתוֹ, לָכֵן בַּעַל הָרַחֲמִים יַסְתִּירֵהוּ בְּסֵתֶר כְּנָפָיו לְעוֹלָמִים, וְיִצְרוֹר בִּצְרוֹר הַחַיִּים אֶת נִשְׁמָתוֹ, יְיָ הוּא נַחֲלָתוֹ, וְיָנוּחַ עַל מִשְׁכָּבוֹ בְּשָׁלוֹם.`;
  const formatedText = [
    {
      prayerInNativeLanguage: `${firstPartPrayer} ${elMalehName} ${secondPartPrayer}`,
      translation: `God, full of mercy, who dwells on high, grant proper rest upon the wings of the Divine Presence, 
      on the levels of the holy and pure who shine like the splendor of heaven, for the soul of ${elMalehName}, this 
      extraordinary soldier who made the ultimate sacrifice on behalf of American, freedom and democracy, as I will 
      give charity for the memory of his soul; let his rest be in the Garden of Eden. Hence, Master of mercy, shelter
      him in the cover of His wings forever and bind his soul with the binding of everlasting life. God is his 
      inheritance and let him rest in peace. And let us say Amen. `,
    },
  ];
  return formatedText;
};
