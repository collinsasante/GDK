import React from 'react';

import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemPanel,
    AccordionItemButton,
} from 'react-accessible-accordion';

const Faq = () => {

    return (
        <div class="accordion__wrapper1">
            <Accordion className="accordion" preExpanded={'a'}>
                <AccordionItem className="accordion-item" uuid="a">
                    <AccordionItemHeading className="accordion-button">
                        <AccordionItemButton className="card-link">
                            Do I need a piano or keyboard to start?
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className="accordion-body">
                        <p>Yes, you'll need access to either a piano or keyboard. A full 88-key keyboard is ideal, but you can start with a 61-key keyboard. We recommend weighted keys for a more authentic playing experience.</p>
                    </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem className="accordion-item" uuid="b">
                    <AccordionItemHeading className="accordion-button">
                        <AccordionItemButton className="card-link">
                            What makes gospel piano different from classical piano?
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className="accordion-body">
                        <p>Gospel piano emphasizes chord-based playing, improvisation, and feel over strict note-reading. It focuses on progressions, runs, fills, and creating a full sound with both hands, encouraging creativity within chord structures.</p>
                    </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem className="accordion-item" uuid="c">
                    <AccordionItemHeading className="accordion-button">
                        <AccordionItemButton className="card-link">
                            How long does it take to learn gospel piano?
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className="accordion-body">
                        <p>With consistent practice (30-60 minutes daily), most beginners can play simple gospel songs within 2-3 months. Intermediate skills typically develop within 6-12 months. However, gospel piano is a lifelong journey of continuous improvement!</p>
                    </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem className="accordion-item" uuid="d">
                    <AccordionItemHeading className="accordion-button">
                        <AccordionItemButton className="card-link">
                            Do I need to read sheet music?
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className="accordion-body">
                        <p>Not necessarily! While basic music reading is helpful, gospel piano primarily uses chord charts and lead sheets. We teach you to play by understanding chord progressions and patterns rather than reading every single note.</p>
                    </AccordionItemPanel>
                </AccordionItem>
            </Accordion>
        </div>
    );
}

export default Faq;