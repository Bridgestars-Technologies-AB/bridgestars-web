<?php
declare(strict_types=1);

namespace App\Enums;


enum Player: string
{
    case North = 'N';
    case East = 'E';
    case South = 'S';
    case West = 'W';
}
