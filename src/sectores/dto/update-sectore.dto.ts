import { PartialType } from '@nestjs/mapped-types';
import { CreateSectoreDto } from './create-sectore.dto';

export class UpdateSectoreDto extends PartialType(CreateSectoreDto) {}
