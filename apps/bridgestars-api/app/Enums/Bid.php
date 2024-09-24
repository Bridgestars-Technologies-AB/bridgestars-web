<?php

declare(strict_types=1);

namespace App\Enums;

use Spatie\Enum\Enum;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

/**
 * @method static self PASS()
 * @method static self C1()
 * @method static self D1()
 * @method static self H1()
 * @method static self S1()
 * @method static self C2()
 * @method static self D2()
 * @method static self H2()
 * @method static self S2()
 * @method static self C3()
 * @method static self D3()
 * @method static self H3()
 * @method static self S3()
 * @method static self C4()
 * @method static self D4()
 * @method static self H4()
 * @method static self S4()
 * @method static self C5()
 * @method static self D5()
 * @method static self H5()
 * @method static self S5()
 * @method static self C6()
 * @method static self D6()
 * @method static self H6()
 * @method static self S6()
 * @method static self C7()
 * @method static self D7()
 * @method static self H7()
 * @method static self S7()
 * @method static self NT1()
 * @method static self NT2()
 * @method static self NT3()
 * @method static self NT4()
 * @method static self NT5()
 * @method static self NT6()
 * @method static self NT7()
 * @method static self DOUBLE()
 * @method static self REDOUBLE()
 * */
#[typescript]
class Bid extends Enum
{
    public static function all(): array
    {
        return [
            'PASS',
            '1C', '1D', '1H', '1S', '1NT',
            '2C', '2D', '2H', '2S', '2NT',
            '3C', '3D', '3H', '3S', '3NT',
            '4C', '4D', '4H', '4S', '4NT',
            '5C', '5D', '5H', '5S', '5NT',
            '6C', '6D', '6H', '6S', '6NT',
            '7C', '7D', '7H', '7S', '7NT',
            'DOUBLE',
            'REDOUBLE',
        ];
    }

    protected static function values(): array
    {
        return [
            'PASS' => 'PASS',
            'C1' => '1C',
            'D1' => '1D',
            'H1' => '1H',
            'S1' => '1S',
            'NT1' => '1NT',
            'C2' => '2C',
            'D2' => '2D',
            'H2' => '2H',
            'S2' => '2S',
            'NT2' => '2NT',
            'C3' => '3C',
            'D3' => '3D',
            'H3' => '3H',
            'S3' => '3S',
            'NT3' => '3NT',
            'C4' => '4C',
            'D4' => '4D',
            'H4' => '4H',
            'S4' => '4S',
            'NT4' => '4NT',
            'C5' => '5C',
            'D5' => '5D',
            'H5' => '5H',
            'S5' => '5S',
            'NT5' => '5NT',
            'C6' => '6C',
            'D6' => '6D',
            'H6' => '6H',
            'S6' => '6S',
            'NT6' => '6NT',
            'C7' => '7C',
            'D7' => '7D',
            'H7' => '7H',
            'S7' => '7S',
            'NT7' => '7NT',
            'DOUBLE' => 'DOUBLE',
            'REDOUBLE' => 'REDOUBLE',
        ];
    }
}
