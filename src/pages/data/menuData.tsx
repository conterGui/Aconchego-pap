export type MenuItem = {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image?: string;
  isSpecial?: boolean;
  allergens?: string[];
};

export const menuItems: MenuItem[] = [
  // Cafés
  {
    id: 1,
    name: "Espresso Jazz",
    price: 1.9,
    description: "Blend exclusivo da casa com notas de chocolate amargo",
    category: "cafes",
    image: "/menu/expresso.png",
  },
  {
    id: 2,
    name: "Cappuccino Blue Note",
    price: 2.5,
    description: "Cappuccino cremoso com arte latte e canela",
    category: "cafes",
    image: "/menu/capuccino.png",
  },
  {
    id: 3,
    name: "Macchiato Miles",
    price: 2.2,
    description: "Espresso com espuma de leite e caramelo",
    category: "cafes",
    image: "/menu/macciato.png",
  },
  {
    id: 4,
    name: "Café Filtrado V60",
    price: 2.8,
    description: "Método manual com grãos especiais, acidez equilibrada",
    category: "cafes",
    isSpecial: true,
    image: "/menu/v60.png",
  },
  {
    id: 5,
    name: "Cold Brew Coltrane",
    price: 2.7,
    description: "Extração a frio por 24h, doce e suave",
    category: "cafes",
    image: "/menu/coldbrew.png",
  },

  // Bebidas
  {
    id: 6,
    name: "Chocolate Quente Duke",
    price: 2.5,
    description: "Chocolate belga com chantilly e marshmallow",
    category: "bebidas",
    allergens: ["leite"],
    image: "/menu/chocolate.png",
  },
  {
    id: 7,
    name: "Chai Latte Ella",
    price: 2.7,
    description: "Especiarias indianas com leite vaporizado",
    category: "bebidas",
    allergens: ["leite"],
    image: "/menu/chailatte.png",
  },
  {
    id: 8,
    name: "Smoothie Berry Fitzgerald",
    price: 3.2,
    description: "Frutas vermelhas, banana e iogurte grego",
    category: "bebidas",
    allergens: ["leite"],
    image: "/menu/smoothie.png",
  },
  {
    id: 9,
    name: "Limonada Sparkling",
    price: 1.8,
    description: "Limão siciliano, água com gás e hortelã",
    category: "bebidas",
    image: "/menu/lemonade.png",
  },
  {
    id: 10,
    name: "Suco Natural Armstrong",
    price: 1.9,
    description: "Laranja, cenoura e gengibre",
    category: "bebidas",
    image: "/menu/juice.png",
  },

  // Doces
  {
    id: 11,
    name: "Cheesecake New York",
    price: 3.2,
    description: "Clássico americano com calda de frutas vermelhas",
    category: "doces",
    allergens: ["leite", "ovos", "glúten"],
    isSpecial: true,
    image: "/menu/cheesecake.png",
  },
  {
    id: 12,
    name: "Brownie Davis",
    price: 2.8,
    description: "Chocolate meio amargo com nozes e sorvete",
    category: "doces",
    allergens: ["leite", "ovos", "glúten", "nozes"],
    image: "/menu/brownie.png",
  },
  {
    id: 13,
    name: "Tiramisu Monk",
    price: 3.5,
    description: "Clássico italiano com café espresso",
    category: "doces",
    allergens: ["leite", "ovos", "glúten"],
    image: "/menu/tiramisu.png",
  },
  {
    id: 14,
    name: "Croissant de Amêndoa",
    price: 1.9,
    description: "Massa folhada com creme de amêndoas",
    category: "doces",
    allergens: ["leite", "ovos", "glúten", "amêndoas"],
    image: "/menu/croissant.png",
  },
  {
    id: 15,
    name: "Muffin de Blueberry",
    price: 1.7,
    description: "Muffin artesanal com frutas frescas",
    category: "doces",
    allergens: ["leite", "ovos", "glúten"],
    image: "/menu/muffin.png",
  },

  // Especiais
  {
    id: 16,
    name: "Affogato al Caffè",
    price: 3.0,
    description: "Sorvete de baunilha afogado no espresso quente",
    category: "especiais",
    allergens: ["leite"],
    isSpecial: true,
    image: "/menu/affogato.png",
  },
  {
    id: 17,
    name: "Irish Coffee Parker",
    price: 3.5,
    description: "Café, whisky irlandês, açúcar e chantilly",
    category: "especiais",
    allergens: ["leite"],
    isSpecial: true,
    image: "/menu/irish.png",
  },
  {
    id: 18,
    name: "Café Bombom Jobim",
    price: 2.7,
    description: "Espresso com leite condensado em camadas",
    category: "especiais",
    allergens: ["leite"],
    isSpecial: true,
    image: "/menu/bombom.png",
  },
];
