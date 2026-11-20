export type BurgerCategory = 'All' | 'Burgers' | 'Chicken' | 'Sides & Drinks';

export interface BurgerItem {
  id: string;
  name: string;
  category: Exclude<BurgerCategory, 'All'>;
  price: number;
  description: string;
  calories: string;
  prepTime: string;
  image: string;
  chooseAndEnjoy?: boolean;
  popular?: boolean;
}

export const BURGER_ITEMS: BurgerItem[] = [
  {
    id: 'grilled-beef-burger',
    name: 'Grilled Beef Burger',
    category: 'Burgers',
    price: 6.99,
    description:
      'Char-grilled double beef patties, melted aged cheddar, crisp pickles, ripe tomato, and smoky house sauce.',
    calories: '740 kcal',
    prepTime: '12 min',
    image: '/src/assets/images/fastos_grilled_beef_hero_1795197763734.jpg',
    popular: true,
  },
  {
    id: 'crispy-chicken',
    name: 'Crispy Chicken',
    category: 'Chicken',
    price: 6.99,
    description:
      'Golden buttermilk-fried chicken breast fillet served on a toasted sesame brioche bun with crisp lettuce and mayo.',
    calories: '620 kcal',
    prepTime: '10 min',
    image: '/src/assets/images/fastos_crispy_chicken_burger_1795197764392.jpg',
    chooseAndEnjoy: true,
  },
  {
    id: 'ultimate-bacon',
    name: 'Ultimate Bacon',
    category: 'Burgers',
    price: 8.99,
    description:
      'Seared beef patty layered with thick-cut smoked bacon, melted cheddar cheese, and sweet caramelized onions.',
    calories: '810 kcal',
    prepTime: '14 min',
    image: '/src/assets/images/fastos_ultimate_bacon_burger_1795197764876.jpg',
    chooseAndEnjoy: true,
  },
  {
    id: 'turkey-burger',
    name: 'Turkey Burger',
    category: 'Burgers',
    price: 7.49,
    description:
      'Seasoned flame-grilled turkey patty topped with sliced avocado, peppery arugula, tomato, and herb aioli.',
    calories: '540 kcal',
    prepTime: '12 min',
    image: '/src/assets/images/fastos_veggie_turkey_burger_1795197764767.jpg',
    chooseAndEnjoy: true,
  },
  {
    id: 'veggie-burger',
    name: 'Veggie Burger',
    category: 'Burgers',
    price: 7.99,
    description:
      'Crisp roasted garden-grain patty with fresh avocado slices, heirloom tomato, arugula, and garlic herb dressing.',
    calories: '480 kcal',
    prepTime: '10 min',
    image: '/src/assets/images/fastos_veggie_turkey_burger_1795197764767.jpg',
    chooseAndEnjoy: true,
  },
  {
    id: 'smokey-house',
    name: 'Smokey House Burger',
    category: 'Burgers',
    price: 9.49,
    description:
      'Double smash beef patties, cheddar melt, charred red onions, and bold hickory-smoked peppercorn sauce.',
    calories: '790 kcal',
    prepTime: '13 min',
    image: '/src/assets/images/food_smash_burger_1795194395478.jpg',
    popular: true,
  },
  {
    id: 'double-bacon-melt',
    name: 'Double Bacon Melt',
    category: 'Burgers',
    price: 9.99,
    description:
      'Extra crispy applewood bacon stacked over double cheddar-blanketed beef on our signature toasted brioche.',
    calories: '860 kcal',
    prepTime: '14 min',
    image: '/src/assets/images/fastos_ultimate_bacon_burger_1795197764876.jpg',
    popular: true,
  },
  {
    id: 'nashville-crunch',
    name: 'Hot Crunch Chicken',
    category: 'Chicken',
    price: 7.99,
    description:
      'Spiced crispy buttermilk chicken breast with cool creamy mayo, iceberg shred, and vine-ripened tomato.',
    calories: '650 kcal',
    prepTime: '11 min',
    image: '/src/assets/images/fastos_crispy_chicken_burger_1795197764392.jpg',
    popular: true,
  },
  {
    id: 'golden-seasoned-fries',
    name: 'Crispy Seasoned Fries',
    category: 'Sides & Drinks',
    price: 3.99,
    description:
      'Twice-fried golden potato fries dusted with sea salt and herbs, paired with smoky chipotle dip.',
    calories: '380 kcal',
    prepTime: '6 min',
    image: '/src/assets/images/food_crispy_fries_1795194395749.jpg',
    popular: true,
  },
  {
    id: 'craft-citrus-cola',
    name: 'Craft Fizz & Spiced Cola',
    category: 'Sides & Drinks',
    price: 3.49,
    description:
      'Ice-cold blood orange citrus fizz or house-spiced cherry cola served in frosty glass bottles.',
    calories: '140 kcal',
    prepTime: '2 min',
    image: '/src/assets/images/food_craft_drinks_1795194395230.jpg',
    popular: true,
  },
];

export const BURGER_CATEGORIES: BurgerCategory[] = [
  'All',
  'Burgers',
  'Chicken',
  'Sides & Drinks',
];
