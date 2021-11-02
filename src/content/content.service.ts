import { Inject, Injectable } from '@nestjs/common';
import { CONTENT_REPOSITORY } from 'src/constants';
import { Content, ContentDto } from './content.entity';
import { v4 as uuidGenerator } from 'uuid';

@Injectable()
export class ContentService {
    constructor(
        @Inject(CONTENT_REPOSITORY) private contentRepository: typeof Content,
    ) {}

    createContent(content: ContentDto): Promise<Content> {
        content.content_id = uuidGenerator();
        return this.contentRepository.create(content);
    }

    fetchContent(tab: string): Promise<Content> {
        return this.contentRepository.findOne({ where: { tab } });
    }
}
