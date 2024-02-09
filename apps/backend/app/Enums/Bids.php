<?php
declare(strict_types=1);

namespace App\Enums;

class Bids
{
    static function all(): array
    {
        return [
            'pass',
            '1C', '1D', '1H', '1S', '1NT',
            '2C', '2D', '2H', '2S', '2NT',
            '3C', '3D', '3H', '3S', '3NT',
            '4C', '4D', '4H', '4S', '4NT',
            '5C', '5D', '5H', '5S', '5NT',
            '6C', '6D', '6H', '6S', '6NT',
            '7C', '7D', '7H', '7S', '7NT',
            'double',
            'redouble',
        ];
    }
}
