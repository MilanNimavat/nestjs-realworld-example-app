import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TagEntity } from './tag.entity';
import { TagCacheService } from './tag-cache.service';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
    private readonly tagCacheService: TagCacheService,
  ) {}

  async findAll(): Promise<TagEntity[]> {
    const cacheKey = 'all_tags';
    const cached = this.tagCacheService.get(cacheKey);

    if (cached) {
      // INTENTIONAL SUBTLE TYPE MISMATCH:
      // tagCacheService returns string[], but findAll return type is Promise<TagEntity[]>
      return cached as any;
    }

    const tags = await this.tagRepository.find();
    const tagStrings = tags.map(t => t.tag);
    this.tagCacheService.set(cacheKey, tagStrings);

    return tags;
  }
}