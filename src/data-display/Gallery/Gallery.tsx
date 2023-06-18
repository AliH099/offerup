import React, { MutableRefObject } from 'react';
import { useKeenSlider, KeenSliderPlugin, KeenSliderInstance } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import Image from 'next/image';
import { styled } from '@mui/system';
import { Stack, useMediaQuery } from '@mui/material';
import theme from 'theme';

export interface GalleryProps {
    imagesPaths: string[];
}

const ThumbnailPlugin = (
    mainRef: MutableRefObject<KeenSliderInstance | null>,
): KeenSliderPlugin => {
    return (slider) => {
        const removeActive = () => {
            slider.slides.forEach((slide) => {
                slide.classList.remove('active');
            });
        };
        const addActive = (idx: number) => {
            slider.slides[idx].classList.add('active');
        };

        const addClickEvents = () => {
            slider.slides.forEach((slide, idx) => {
                slide.addEventListener('click', () => {
                    if (mainRef.current) mainRef.current.moveToIdx(idx);
                });
            });
        };

        slider.on('created', () => {
            if (!mainRef.current) return;
            addActive(slider.track.details.rel);
            addClickEvents();
            mainRef.current.on('animationStarted', (main) => {
                removeActive();
                const next = main.animator.targetIdx || 0;
                addActive(main.track.absToRel(next));
                slider.moveToIdx(next);
            });
        });
    };
};

const Gallery: React.FC<GalleryProps> = (props) => {
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        initial: 0,
        slides: {
            perView: 1,
        },
    });

    const [thumbnailRef] = useKeenSlider<HTMLDivElement>(
        {
            initial: 0,
            slides: {
                origin: 'center',
                spacing: 10,
                perView: 5,
            },
            vertical: !isMobile,
        },
        [ThumbnailPlugin(instanceRef)],
    );

    return (
        <Stack>
            <GalleryContainer
                sx={{
                    width: '100%',
                }}
                direction={'column'}
            >
                {/* Notice ReactImageMagnify has conflict with ltr direction(real rtl) 
                This Stack is for display enlarged image out of his parent scope */}
                <Stack id="portal" sx={{ direction: 'rtl' }}></Stack>
                <div ref={sliderRef} className="keen-slider first-slider">
                    {props.imagesPaths.map((item, index) => {
                        return (
                            <div key={index} className="keen-slider__slide slide">
                                <Stack sx={{ direction: 'rtl', width: '100%', height: '300px' }}>
                                    <Image
                                        src={item}
                                        fill
                                        alt="1"
                                        // height={200}
                                        // width={400}
                                        style={{ objectFit: 'cover' }}
                                    />
                                </Stack>
                            </div>
                        );
                    })}
                </div>
                <div ref={thumbnailRef} className="keen-slider thumbnail">
                    {props.imagesPaths.map((item, index) => {
                        return (
                            <div key={index} className="keen-slider__slide thumbnail-slide">
                                <Image
                                    src={item}
                                    fill
                                    style={{ objectFit: 'contain' }}
                                    alt="product-picture"
                                />
                            </div>
                        );
                    })}
                </div>
            </GalleryContainer>
        </Stack>
    );
};

const GalleryContainer = styled(Stack)(
    ({ theme }) => `
    position: relative;
    .slide {
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
    }
    .thumbnail{
        flex-basis: 20%;
    }
    .thumbnail-slide {
        width: 80px;
        height: 80px;
        padding: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .thumbnail .keen-slider__slide {
        font-size: 30px;
        transition: opacity 0.2s;
        margin-top: 10px;
    }
    .thumbnail .keen-slider__slide {
        cursor: pointer;
        border-radius: 10px;
        padding:10px
    }
    .thumbnail .keen-slider__slide.active {
    }
    .thumbnail .keen-slider__slide:not(.active) {
        opacity: 0.5;
    }
    .divider {
        display: none;
    }

    @media only screen and (max-width: 768px) {
        border-radius: 15px;
        .slide {
            border: none;
        }
        .thumbnail .keen-slider__slide {
            border: none !important;
            width: 64px;
            border-radius: 2px;
            height: 64px;
        }
        .divider {
            width: 80%;
            display: block;
            margin: 18px auto 10px auto;
        }
    }
`,
);

export default Gallery;
